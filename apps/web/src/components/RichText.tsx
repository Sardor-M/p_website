import React from 'react';
import styled from 'styled-components';
import { themeColor } from '@/themes/color';
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

type RichTextProps = {
    richTextArray: RichTextItemResponse[] | null | undefined;
    isInline?: boolean;
};

const Bold = styled.strong`
    font-weight: 700;
`;

const Italic = styled.em`
    font-style: italic;
`;

const Strikethrough = styled.del`
    text-decoration: line-through;
`;

const Underline = styled.u`
    text-decoration: underline;
`;

const InlineCode = styled.code`
    background: ${({ theme }) =>
        theme.mode === 'dark' ? themeColor.backgroundSpan.dark : themeColor.backgroundSpan.light};
    color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.redHighlightCol : '#e01e5a')};
    padding: 0.2em 0.1em;
    border-radius: 3px;
    font-size: 0.95em;
    font-family: 'Fira Code', 'Courier New', monospace;
`;

const Link = styled.a`
    color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.redHighlightCol : '#0969da')};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
        border-bottom-color: currentColor;
    }
`;

export default function RichText({ richTextArray, isInline = false }: RichTextProps) {
    if (!richTextArray || richTextArray.length === 0 || isInline === true) return null;

    return richTextArray.map((text, index) => {
        let content: React.ReactNode = text.plain_text ?? '';

        if (text.annotations) {
            if (text.annotations.bold) {
                content = <Bold>{content}</Bold>;
            }
            if (text.annotations.italic) {
                content = <Italic>{content}</Italic>;
            }
            if (text.annotations.strikethrough) {
                content = <Strikethrough>{content}</Strikethrough>;
            }
            if (text.annotations.underline) {
                content = <Underline>{content}</Underline>;
            }
            if (text.annotations.code) {
                content = <InlineCode>{content}</InlineCode>;
            }
        }

        if (text.href) {
            content = (
                <Link href={text.href} target="_blank" rel="noopener noreferrer">
                    {content}
                </Link>
            );
        }

        return <React.Fragment key={index}>{content}</React.Fragment>;
    });
}
