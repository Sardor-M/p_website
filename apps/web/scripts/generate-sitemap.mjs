import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_URL = process.env.FIREBASE_FUNCTIONS_URL || '';
const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

async function getPosts() {
    try {
        console.log('Fetching from:', API_URL);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endpoint: `/v1/databases/${DATABASE_ID}/query`,
                method: 'POST',
                body: {
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
                    page_size: 100,
                },
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Response not OK:', response.status, text.substring(0, 200));
            return [];
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Response is not JSON:', contentType, text.substring(0, 200));
            return [];
        }

        const data = await response.json();

        if (data.results) {
            return data.results;
        } else if (Array.isArray(data)) {
            return data;
        } else {
            console.error('Unexpected response structure:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

function extractTextFromProperty(property) {
    if (!property) return '';

    if (property.type === 'rich_text' && property.rich_text) {
        return property.rich_text.map((text) => text.plain_text).join('');
    }

    if (property.type === 'title' && property.title) {
        return property.title.map((text) => text.plain_text).join('');
    }

    return '';
}

async function generateSitemap() {
    console.log('Generating sitemap...');

    const posts = await getPosts();
    console.log(`Found ${posts.length} published posts`);

    const postUrls = posts
        .map((post) => {
            try {
                const properties = post.properties || {};
                const slug = extractTextFromProperty(properties.Slug) || post.id;
                const date = properties.Date?.date?.start || new Date().toISOString();

                return `
                    <url>
                        <loc>https://sardor-m.dev/blog/${slug}</loc>
                        <lastmod>${new Date(date).toISOString().split('T')[0]}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.8</priority>
                    </url>`;
            } catch (err) {
                console.error('Error processing post:', err);
                return '';
            }
        })
        .filter((url) => url !== '')
        .join('');

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://sardor-m.dev/</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>https://sardor-m.dev/blog</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.9</priority>
                </url>
                <url>
                    <loc>https://sardor-m.dev/about</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>${postUrls}
            </urlset>
    `;

    const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, sitemap);
    console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap().catch(console.error);
