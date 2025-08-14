import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

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

export type NotionProperty = {
    id: string;
    type: string;
};

export type TitleProperty = NotionProperty & {
    type: 'title';
    title: RichTextItemResponse[];
};

export type RichTextProperty = NotionProperty & {
    type: 'rich_text';
    rich_text: RichTextItemResponse[];
};

export type DateProperty = NotionProperty & {
    type: 'date';
    date: {
        start: string;
        end?: string;
    } | null;
};

export type MultiSelectProperty = NotionProperty & {
    type: 'multi_select';
    multi_select: Array<{
        id: string;
        name: string;
        color: string;
    }>;
};

export type CheckboxProperty = NotionProperty & {
    type: 'checkbox';
    checkbox: boolean;
};

export type NotionPageProperties = {
    Title?: TitleProperty;
    Subtitle?: RichTextProperty;
    Date?: DateProperty;
    CoverImage?: RichTextProperty;
    Tags?: MultiSelectProperty;
    Topic?: MultiSelectProperty;
    Slug?: RichTextProperty;
    Introduction?: RichTextProperty;
    'Read Time'?: RichTextProperty;
    Author?: RichTextProperty;
    AuthorBio?: RichTextProperty;
    Published?: CheckboxProperty;
};

export type NotionPage = PageObjectResponse & {
    properties: NotionPageProperties;
};

export type NotionDatabaseResponse = {
    results: NotionPage[];
    next_cursor?: string;
    has_more: boolean;
};

export type NotionBlocksResponse = {
    results: NotionBlockType[];
    next_cursor?: string;
    has_more: boolean;
};
