import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

type ParagraphBlock = {
    id: string;
    type: 'paragraph';
    paragraph: {
        rich_text: RichTextItemResponse[];
    };
};

type HeadingBlock = {
    id: string;
    type: 'heading_1' | 'heading_2' | 'heading_3';
    heading_1?: {
        rich_text: RichTextItemResponse[];
    };
    heading_2?: {
        rich_text: RichTextItemResponse[];
    };
    heading_3?: {
        rich_text: RichTextItemResponse[];
    };
};

type ListBlock = {
    id: string;
    type: 'bulleted_list_item' | 'numbered_list_item';
    bulleted_list_item?: {
        rich_text: RichTextItemResponse[];
    };
    numbered_list_item?: {
        rich_text: RichTextItemResponse[];
    };
};

type QuoteBlock = {
    id: string;
    type: 'quote';
    quote: { rich_text: RichTextItemResponse[] };
};

type CodeBlockType = {
    id: string;
    type: 'code';
    code: { rich_text: RichTextItemResponse[]; language: string };
};

type DividerBlock = { id: string; type: 'divider' };

type ImageBlock = {
    id: string;
    type: 'image';
    image: {
        file?: { url: string };
        external?: { url: string };
        caption?: RichTextItemResponse[];
    };
};

type ToggleBlock = {
    id: string;
    type: 'toggle';
    toggle: { rich_text: RichTextItemResponse[] };
    children?: NotionBlockType[];
};

type CalloutBlock = {
    id: string;
    type: 'callout';
    callout: {
        icon?: { emoji?: string };
        rich_text: RichTextItemResponse[];
    };
};

type TagsBlock = {
    id: string;
    type: 'tags';
    tags: string[];
};

export type NotionBlockType =
    | ParagraphBlock
    | HeadingBlock
    | ListBlock
    | QuoteBlock
    | CodeBlockType
    | DividerBlock
    | ImageBlock
    | ToggleBlock
    | CalloutBlock
    | TagsBlock;

export type NotionBlockProps = { block: NotionBlockType };
