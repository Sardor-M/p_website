import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { createHash } from 'crypto';
import Redis from 'ioredis';

const notionApiSecret = defineSecret('NOTION_API_SECRET');
const redisUrl = defineSecret('REDIS_URL');

const NOTION_VERSION = '2022-06-28';
const CACHE_TTL = 7200;
const LONG_CACHE_TTL = 172800;

type NotionProxyRequestBody = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: Record<string, unknown>;
};

/* initialize redis client - singleton pattern */
let redis: Redis | null = null;

/* this will create a optimized cache key for redis */
const generateCacheKey = (
    method: string,
    endpoint: string,
    body?: Record<string, unknown>
): string => {
    const bodyHash = body
        ? createHash('md5').update(JSON.stringify(body)).digest('hex').substring(0, 8)
        : 'nobody';

    const cleanEndpoint = endpoint.replace(/^\/v1\//, '');

    return `notion:${method}:${cleanEndpoint}:${bodyHash}`;
};

const getRedisClient = (): Redis | null => {
    try {
        if (!redis && redisUrl.value()) {
            redis = new Redis(redisUrl.value(), {
                maxRetriesPerRequest: 1,
                retryStrategy: (times) => {
                    if (times > 1) return null;
                    return Math.min(times * 100, 1000);
                },
                connectTimeout: 3000,
                lazyConnect: true /* we only connect when we need to */,
                keepAlive: 60000,
                family: 4,
                enableReadyCheck: false,
                db: 0,
            });

            redis.on('error', (err) => {
                console.error('Redis connection error:', err);
            });

            redis.on('connect', () => {
                console.info('Redis connected successfully');
            });

            redis.on('ready', () => {
                console.info('Redis ready to accept commands');
            });
        }
        return redis;
    } catch (error) {
        console.error('Failed to initialize Redis:', error);
        return null;
    }
};

export const notionApiV2 = onRequest(
    {
        secrets: [notionApiSecret, redisUrl],
        cors: true,
        maxInstances: 10,
        concurrency: 100,
        memory: '256MiB',
        timeoutSeconds: 60,
    },
    async (request, response) => {
        response.set(
            'Cache-Control',
            'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
            /* 7 days stale-while-revalidate process */
        );

        if (request.method === 'OPTIONS') {
            response.status(204).send('');
            return;
        }

        if (request.method !== 'POST') {
            response.status(405).send('Method not allowed');
            return;
        }

        try {
            const { endpoint, method = 'GET', body } = request.body as NotionProxyRequestBody;

            if (!endpoint) {
                response.status(400).json({ error: 'Endpoint is required' });
                return;
            }

            /* then we create cache key */
            const cacheKey = generateCacheKey(method, endpoint, body);
            const redisClient = getRedisClient();

            if (redisClient) {
                try {
                    await redisClient.ping();
                } catch (err) {
                    console.error('Redis ping failed:', err);
                }
            }

            /* then we try to get from cache for read operations */
            if (
                redisClient &&
                (method === 'GET' || (method === 'POST' && endpoint.includes('/query')))
            ) {
                try {
                    /* we use JSON.GET for native JSON handling faster retrieval */
                    const cached = await redisClient.call('JSON.GET', cacheKey);
                    if (cached) {
                        console.info('Redis cache hit for:', endpoint);
                        const parsedData = typeof cached === 'string' ? JSON.parse(cached) : cached;

                        response.set('X-Cache', 'HIT');
                        response.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
                        response.status(200).json(parsedData);
                        return;
                    }
                } catch (redisError) {
                    console.info('Redis get error:', redisError);
                    /* here we continue to fetch from the notion api */
                }
            }

            const apiSecret = notionApiSecret.value();

            const notionResponse = await fetch(`https://api.notion.com${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${apiSecret}`,
                    'Notion-Version': NOTION_VERSION,
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            const data = await notionResponse.json();

            if (!notionResponse.ok) {
                console.error('Notion API error:', data);
                response.status(notionResponse.status).json(data);
                return;
            }

            /* we cache successful read responses */
            if (
                redisClient &&
                (method === 'GET' || (method === 'POST' && endpoint.includes('/query')))
            ) {
                try {
                    const ttl = endpoint.includes('/databases') ? LONG_CACHE_TTL : CACHE_TTL;

                    await redisClient.call('JSON.SET', cacheKey, '.', JSON.stringify(data));
                    await redisClient.expire(cacheKey, ttl);
                    console.info(`Cached in Redis with TTL ${ttl}s:`, endpoint);
                } catch (redisError) {
                    console.error('Redis set error:', redisError);
                }
            }
            response.status(200).json(data);
        } catch (error) {
            console.error('Function error:', error);
            response.status(500).json({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
);

/* we clear cache endpoint - for manual cache invalidation */
export const clearNotionCache = onRequest(
    {
        secrets: [redisUrl],
        cors: true,
    },
    async (request, response) => {
        try {
            if (request.method !== 'POST') {
                response.status(405).json({ error: 'Method not allowed' });
                return;
            }

            const redisClient = getRedisClient();

            if (!redisClient) {
                response.status(503).json({ error: 'Redis not available' });
                return;
            }

            await redisClient.ping();

            const keys = await redisClient.keys('notion:*');
            if (keys.length > 0) {
                /* here we use pipeline for better performance and reliability */
                if (keys.length > 100) {
                    const chunks = [];
                    for (let i = 0; i < keys.length; i += 100) {
                        chunks.push(keys.slice(i, i + 100));
                    }
                    for (const chunk of chunks) {
                        await redisClient.del(...chunk);
                    }
                } else {
                    await redisClient.del(...keys);
                }
            }
            response.status(200).json({
                message: 'Cache cleared successfully',
                keysCleared: keys.length,
            });
        } catch (error) {
            console.error('Clear cache error:', error);
            response.status(500).json({
                error: 'Failed to clear cache',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
);

/* then we get cache statistics */
export const getCacheStats = onRequest(
    {
        secrets: [redisUrl],
        cors: true,
    },
    async (request, response) => {
        try {
            if (request.method !== 'GET') {
                response.status(405).json({ error: 'Method not allowed' });
                return;
            }

            const redisClient = getRedisClient();

            if (!redisClient) {
                response.status(503).json({ error: 'Redis not available' });
                return;
            }

            await redisClient.ping();

            const keys = await redisClient.keys('notion:*');
            const info = await redisClient.info('memory');

            const keyInfo = await Promise.all(
                keys.slice(0, 20).map(async (key) => ({
                    key: key.substring(0, 50) + '...',
                    ttl: await redisClient.ttl(key),
                }))
            );

            response.status(200).json({
                totalKeys: keys.length,
                memoryInfo: info,
                sampleKeys: keyInfo,
            });
        } catch (error) {
            console.error('Cache stats error:', error);
            response.status(500).json({
                error: 'Failed to get cache stats',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
);

/* we automatically clean up stale cache every 24 hours */
export const scheduledCacheCleanup = onSchedule(
    {
        schedule: 'every 24 hours',
        timeZone: 'UTC',
        secrets: [redisUrl],
        memory: '256MiB',
    },
    async () => {
        const redisClient = getRedisClient();

        if (!redisClient) {
            console.error('Redis not available for scheduled cleanup');
            return;
        }

        try {
            await redisClient.ping();

            const keys = await redisClient.keys('notion:*');
            let cleaned = 0;
            let expired = 0;

            for (const key of keys) {
                try {
                    const ttl = await redisClient.ttl(key);
                    if (ttl === -2 || ttl === -1) {
                        await redisClient.del(key);
                        expired++;
                    } else if (ttl < 3600) {
                        await redisClient.del(key);
                        cleaned++;
                    }
                } catch (keyError) {
                    console.error(`Failed to process key ${key}:`, keyError);
                    continue;
                }
            }

            console.info(`Scheduled cleanup: ${expired} expired, ${cleaned} stale keys removed`);
        } catch (error) {
            console.error('Scheduled cache cleanup error:', error);
        }
    }
);

/* webhook to check for the content changes to invalidate the cache */
export const notionWebhook = onRequest(
    {
        secrets: [redisUrl, notionApiSecret],
        cors: false,
        memory: '256MiB',
    },
    async (request, response) => {
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.includes('Bearer')) {
            response.status(401).json({ error: 'Unauthorized' });
            return;
        }

        try {
            const { page_id, database_id } = request.body as {
                page_id?: string;
                database_id?: string;
            };

            const redisClient = getRedisClient();
            if (!redisClient) {
                response.status(503).json({ error: 'Redis not available' });
                return;
            }

            if (page_id) {
                const patterns = [
                    `notion:*:blocks/${page_id}:*`,
                    `notion:*:pages/${page_id}:*`,
                    `notion:POST:databases/*/query:*`,
                ];

                for (const pattern of patterns) {
                    const keys = await redisClient.keys(pattern);
                    if (keys.length > 0) {
                        await redisClient.del(...keys);
                        console.info(`Invalidated ${keys.length} keys for page ${page_id}`);
                    }
                }
            }

            if (database_id) {
                const keys = await redisClient.keys(`notion:*${database_id}*`);
                if (keys.length > 0) {
                    await redisClient.del(...keys);
                    console.info(`Invalidated ${keys.length} keys for database ${database_id}`);
                }
            }

            response.status(200).json({ success: true, invalidated: true });
        } catch (error) {
            response.status(500).json({ error: 'Webhook processing failed' });
        }
    }
);
