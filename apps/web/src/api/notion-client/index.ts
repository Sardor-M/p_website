import {
    DateProperty,
    MultiSelectProperty,
    NotionBlockType,
    NotionDatabaseResponse,
    NotionPage,
    RichTextProperty,
    TitleProperty,
} from '@/types/notions';
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_SECRET;
const NOTION_VERSION = '2022-06-28';
const DATABASE_ID = import.meta.env.VITE_NOTION_BLOG_DATABASE_ID;

const getApiEndpoint = () => {
    if (import.meta.env.DEV) {
        /* in dev mode, we use Vite proxy from vite.config.ts */
        return '';
    } else if (import.meta.env.VITE_FIREBASE_FUNCTIONS_URL) {
        return import.meta.env.VITE_FIREBASE_FUNCTIONS_URL;
    } else {
        console.warn('No Firebase Functions URL configured. API calls may fail.');
        return '';
    }
};

const API_BASE = getApiEndpoint();

export type NotionPost = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    topic: string[];
    slug: string;
    introduction: string;
    readTime: string;
    coverImage: string;
    author?: {
        name: string;
        bio: string;
    };
};

export type NotionPostWithContent = NotionPost & {
    content: NotionBlockType[];
    metadata: {
        author: {
            name: string;
            bio: string;
        };
        topic: string;
    };
};

export async function batchApiCalls(
    requests: Array<{ endpoint: string; method?: string; body?: NotionBlockType }>
) {
    const promises = requests.map((req) =>
        notionApiCall(req.endpoint, {
            method: req.method || 'GET',
            body: req.body ? JSON.stringify(req.body) : undefined,
        })
    );

    return Promise.allSettled(promises);
}

export async function notionApiCall(endpoint: string, options: RequestInit = {}) {
    const isProduction = !import.meta.env.DEV;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 10000);

    try {
        if (isProduction && import.meta.env.VITE_FIREBASE_FUNCTIONS_URL) {
            const functionUrl = `${API_BASE}`;

            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endpoint,
                    method: options.method || 'GET',
                    body: options.body ? JSON.parse(options.body as string) : undefined,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response;
        } else {
            /* in dev mode, we use Vite proxy from vite.config.ts */
            const response = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers: {
                    Authorization: `Bearer ${NOTION_API_KEY}`,
                    'Notion-Version': NOTION_VERSION,
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response;
        }
    } catch (error: unknown) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout after 10 seconds');
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

/* we get the all posts from Notion database */
export async function getPosts(): Promise<NotionPost[]> {
    try {
        const response = await notionApiCall(`/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            body: JSON.stringify({
                filter: {
                    property: 'Published',
                    checkbox: {
                        equals: true,
                    },
                },
                sorts: [
                    {
                        property: 'Date',
                        direction: 'descending',
                    },
                ],
                page_size: 50,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const data: NotionDatabaseResponse = await response.json();
        const results = data.results || data;

        if (!Array.isArray(results)) {
            console.error('Invalid response format:', data);
            return [];
        }

        return results.map((page: NotionPage) => {
            const properties = page.properties;
            return {
                id: page.id,
                title: extractTitle(properties.Title),
                subtitle: extractRichText(properties.Subtitle),
                date: extractDate(properties.Date),
                coverImage: extractRichText(properties.CoverImage) || '',
                topic: extractMultiSelect(properties.Tags || properties.Topic),
                slug: extractRichText(properties.Slug) || page.id,
                introduction: extractRichText(properties.Introduction),
                readTime: extractRichText(properties['Read Time']) || '5 min read',
                author: properties.Author
                    ? {
                          name: extractRichText(properties.Author),
                          bio: extractRichText(properties.AuthorBio) || '',
                      }
                    : undefined,
            };
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

/* we get a single post by slug */
export async function getPostBySlug(slug: string): Promise<NotionPostWithContent | null> {
    try {
        const response = await notionApiCall(`/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            body: JSON.stringify({
                filter: {
                    and: [
                        {
                            property: 'Published',
                            checkbox: {
                                equals: true,
                            },
                        },
                        {
                            property: 'Slug',
                            rich_text: {
                                equals: slug,
                            },
                        },
                    ],
                },
            }),
        });

        if (!response.ok) {
            console.error('Failed to fetch post by slug:', response.status);
            return null;
        }

        const data: NotionDatabaseResponse = await response.json();
        const results = data.results || data;

        if (!Array.isArray(results) || results.length === 0) {
            return null;
        }

        const page = results[0];

        const postData = mapPageToPost(page);
        const blocks = await getPageBlocks(page.id);

        return {
            ...postData,
            content: blocks,
            metadata: {
                author: postData.author || { name: 'Sardor-M', bio: '' },
                topic: postData.topic[0] || '',
            },
        };
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
}

/* we get a single post by ID */
export async function getPostById(pageId: string): Promise<NotionPostWithContent | null> {
    try {
        const pageResponse = await notionApiCall(`/v1/pages/${pageId}`, {
            method: 'GET',
        });

        if (!pageResponse.ok) {
            console.error('Failed to fetch post by ID:', pageResponse.status);
            return null;
        }

        const page = await pageResponse.json();
        const postData = mapPageToPost(page);
        const blocks = await getPageBlocks(pageId);

        return {
            ...postData,
            content: blocks,
            metadata: {
                author: postData.author || { name: 'Sardor-M', bio: '' },
                topic: postData.topic[0] || '',
            },
        };
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return null;
    }
}

async function getPageBlocks(pageId: string): Promise<NotionBlockType[]> {
    const blocks: NotionBlockType[] = [];
    let cursor: string | undefined = undefined;
    let iterations = 0;
    const maxIterations = 10;

    try {
        do {
            const params = cursor ? `?start_cursor=${cursor}` : '';
            const response = await notionApiCall(`/v1/blocks/${pageId}/children${params}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.info('Error fetching blocks:', response.status);
                break;
            }

            const data = await response.json();
            blocks.push(...(data.results || []));
            cursor = data.next_cursor;
            iterations++;
        } while (cursor && iterations < maxIterations);

        return blocks;
    } catch (error) {
        console.error('Error fetching page blocks:', error);
        return blocks;
    }
}

/* helper method to map page to post */
function mapPageToPost(page: NotionPage): NotionPost {
    const properties = page.properties || {};

    return {
        id: page.id,
        title: extractTitle(properties.Title),
        subtitle: extractRichText(properties.Subtitle),
        date: extractDate(properties.Date),
        topic: extractMultiSelect(properties.Tags || properties.Topic),
        slug: extractRichText(properties.Slug) || page.id,
        introduction: extractRichText(properties.Introduction),
        coverImage: extractRichText(properties.CoverImage) || '',
        readTime: extractRichText(properties['Read Time']) || '5 min read',
        author: properties.Author
            ? {
                  name: extractRichText(properties.Author),
                  bio: extractRichText(properties.AuthorBio) || '',
              }
            : undefined,
    };
}

function extractTitle(property: TitleProperty | undefined): string {
    if (!property) return '';
    if (property.type === 'title' && property.title) {
        return property.title.map((text: RichTextItemResponse) => text.plain_text).join('');
    }
    return '';
}

function extractRichText(property: RichTextProperty | undefined): string {
    if (!property) return '';
    if (property.type === 'rich_text' && property.rich_text) {
        return property.rich_text.map((text: RichTextItemResponse) => text.plain_text).join('');
    }
    return '';
}

function extractDate(property: DateProperty | undefined): string {
    if (!property) return new Date().toISOString();
    if (property.type === 'date' && property.date) {
        return property.date.start || new Date().toISOString();
    }
    return new Date().toISOString();
}

function extractMultiSelect(property: MultiSelectProperty | undefined): string[] {
    if (!property) return [];
    if (property.type === 'multi_select' && property.multi_select) {
        return property.multi_select.map((item) => item.name);
    }
    return [];
}
