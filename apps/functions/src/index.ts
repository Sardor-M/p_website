import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

const notionApiSecret = defineSecret('NOTION_API_SECRET');
const NOTION_VERSION = '2022-06-28';

type NotionProxyRequestBody = {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
};

export const notionApiV2 = onRequest(
  {
    secrets: [notionApiSecret],
    cors: true,
  },
  async (request, response) => {
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
