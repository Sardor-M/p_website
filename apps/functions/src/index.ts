import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

const notionApiSecret = defineSecret('NOTION_API_SECRET');

const NOTION_VERSION = '2022-06-28';
const SHORT_CACHE_TTL_MS = 5 * 60 * 1000;
const LONG_CACHE_TTL_MS = 60 * 60 * 1000;

type NotionProxyRequestBody = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: Record<string, unknown>;
};

/* in-memory cache (per instance) for avoiding external latency. */
type CacheEntry = { data: unknown; timestamp: number; ttlMs: number };
const memoryCache = new Map<string, CacheEntry>();

function makeCacheKey(method: string, endpoint: string, body?: Record<string, unknown>): string {
    const bodyKey = body ? JSON.stringify(body).slice(0, 200) : 'nobody';
    return `${method}:${endpoint}:${bodyKey}`;
}

function getFromCache(key: string): unknown | null {
    const hit = memoryCache.get(key);
    if (!hit) return null;
    if (Date.now() - hit.timestamp > hit.ttlMs) {
        memoryCache.delete(key);
        return null;
    }
    return hit.data;
}

function putInCache(key: string, data: unknown, ttlMs: number): void {
    memoryCache.set(key, { data, timestamp: Date.now(), ttlMs });
    if (memoryCache.size > 500) {
        const entries = Array.from(memoryCache.entries()).sort(
            (a, b) => a[1].timestamp - b[1].timestamp
        );
        for (let i = 0; i < Math.min(50, entries.length); i++) {
            memoryCache.delete(entries[i][0]);
        }
    }
}

export const notionApiV2 = onRequest(
    {
        secrets: [notionApiSecret],
        cors: true,
        maxInstances: 10,
        minInstances: 1,
        concurrency: 100,
        memory: '256MiB',
        timeoutSeconds: 30,
    },
    async (request, response) => {
        response.set(
            'Cache-Control',
            'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
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

            const cacheable =
                method === 'GET' || (method === 'POST' && endpoint.includes('/query'));
            const cacheKey = cacheable ? makeCacheKey(method, endpoint, body) : '';
            if (cacheable) {
                const cached = getFromCache(cacheKey);
                if (cached) {
                    response.set('X-Cache', 'HIT');
                    response.status(200).json(cached);
                    return;
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

            if (cacheable) {
                const ttlMs = endpoint.includes('/databases')
                    ? LONG_CACHE_TTL_MS
                    : SHORT_CACHE_TTL_MS;
                putInCache(cacheKey, data, ttlMs);
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

/* clear in-memory cache */
export const clearNotionCache = onRequest({ cors: true }, async (request, response) => {
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const size = memoryCache.size;
    memoryCache.clear();
    response.status(200).json({ message: 'Cache cleared successfully', keysCleared: size });
});

/* then we get cache statistics */
export const getCacheStats = onRequest({ cors: true }, async (request, response) => {
    if (request.method !== 'GET') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }
    response.status(200).json({
        totalKeys: memoryCache.size,
    });
});

/* webhook to check for the content changes to invalidate the cache */
export const notionWebhook = onRequest({ cors: false }, async (request, response) => {
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
        let cleared = 0;
        memoryCache.forEach((_value, key) => {
            if (
                (page_id && key.includes(page_id)) ||
                (database_id && key.includes('databases') && key.includes('/query'))
            ) {
                memoryCache.delete(key);
                cleared++;
            }
        });
        response.status(200).json({ success: true, invalidated: true, cleared });
    } catch (error) {
        response.status(500).json({ error: 'Webhook processing failed' });
    }
});
