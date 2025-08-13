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
    content: any[];
    metadata: {
        author: {
            name: string;
            bio: string;
        };
        topic: string;
    };
};

async function notionApiCall(endpoint: string, options: RequestInit = {}) {
    const isProduction = !import.meta.env.DEV;

    if (isProduction && import.meta.env.VITE_FIREBASE_FUNCTIONS_URL) {
        const functionUrl = `${API_BASE}`;

        return fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endpoint,
                method: options.method || 'GET',
                body: options.body ? JSON.parse(options.body as string) : undefined,
            }),
        });
    } else {
        /* in dev mode, we use Vite proxy from vite.config.ts */
        return fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });
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
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Notion API error:', errorText);
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results || data;

        if (!Array.isArray(results)) {
            console.error('Invalid response format:', data);
            return [];
        }

        return results.map((page: any) => {
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

        const data = await response.json();
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

async function getPageBlocks(pageId: string): Promise<any[]> {
    const blocks: any[] = [];
    let cursor: string | undefined = undefined;
    const maxIterations = 5;
    let iterations = 0;

    try {
        do {
            const params = cursor ? `?start_cursor=${cursor}` : '';
            const response = await notionApiCall(`/v1/blocks/${pageId}/children${params}`, {
                method: 'GET',
            });

            if (!response.ok) {
                console.error('Error fetching blocks:', response.status);
                break;
            }

            const data = await response.json();
            const results = data.results || data;

            if (Array.isArray(results)) {
                blocks.push(...results);
            }

            cursor = data.next_cursor || undefined;
            iterations++;
        } while (cursor && iterations < maxIterations);

        return blocks;
    } catch (error) {
        console.error('Error fetching page blocks:', error);
        return blocks;
    }
}

/* helper method to map page to post */
function mapPageToPost(page: any): NotionPost {
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

function extractTitle(property: any): string {
    if (!property) return '';
    if (property.type === 'title' && property.title) {
        return property.title.map((text: any) => text.plain_text).join('');
    }
    if (Array.isArray(property)) {
        return property.map((text: any) => text.plain_text || '').join('');
    }
    return '';
}

function extractRichText(property: any): string {
    if (!property) return '';
    if (property.type === 'rich_text' && property.rich_text) {
        return property.rich_text.map((text: any) => text.plain_text).join('');
    }
    if (Array.isArray(property)) {
        return property.map((text: any) => text.plain_text || '').join('');
    }
    return '';
}

function extractDate(property: any): string {
    if (!property) return new Date().toISOString();
    if (property.type === 'date' && property.date) {
        return property.date.start || new Date().toISOString();
    }
    if (typeof property === 'string') {
        return property;
    }
    return new Date().toISOString();
}

function extractMultiSelect(property: any): string[] {
    if (!property) return [];
    if (property.type === 'multi_select' && property.multi_select) {
        return property.multi_select.map((item: any) => item.name);
    }
    if (Array.isArray(property)) {
        return property.map((item: any) => item.name || item).filter(Boolean);
    }
    return [];
}
