import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import Redis from 'ioredis';

const notionApiSecret = defineSecret('NOTION_API_SECRET');
const redisUrl = defineSecret('REDIS_URL');

const NOTION_VERSION = '2022-06-28';
const CACHE_TTL = 3600; /* 1 hour */
const LONG_CACHE_TTL = 86400; /* 24 hours for lists */

type NotionProxyRequestBody = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: Record<string, unknown>;
};

/* initialize redis client - singleton pattern */
let redis: Redis | null = null;

const getRedisClient = (): Redis | null => {
    try {
        if (!redis && redisUrl.value()) {
            redis = new Redis(redisUrl.value(), {
                maxRetriesPerRequest: 3,
                retryStrategy: (times) => {
                    if (times > 3) return null;
                    return Math.min(times * 200, 2000);
                },
                connectTimeout: 10000,
                family: 4,
                enableReadyCheck: true,
                autoResubscribe: true,
                autoResendUnfulfilledCommands: true,
                reconnectOnError: (err) => {
                    const targetError = 'READONLY';
                    if (err.message.includes(targetError)) {
                        return true;
                    }
                    return false;
                },
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
    },
    async (request, response) => {
        /* we set cache headers for CDN */
        response.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');

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
            const cacheKey = `notion:${method}:${endpoint}:${JSON.stringify(body || {})}`;
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
                    const cached = await redisClient.get(cacheKey);
                    if (cached) {
                        console.info('Redis cache hit for:', endpoint);
                        response.status(200).json(JSON.parse(cached));
                        return;
                    }
                } catch (redisError) {
                    console.error('Redis get error:', redisError);
                }
            }

            const apiSecret = notionApiSecret.value();

            console.log(`Secret loaded: ${!!apiSecret}, Length: ${apiSecret?.length || 0}`);

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
                    /* we use longer TTL for database queries (blog lists) */
                    const ttl = endpoint.includes('/databases') ? LONG_CACHE_TTL : CACHE_TTL;

                    await redisClient.setex(cacheKey, ttl, JSON.stringify(data));
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

/*  we clear cache endpoint - for manual cache invalidation */
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
                await redisClient.del(...keys);
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
