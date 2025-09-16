import styled from 'styled-components';
import { themeColor } from '@/themes/color';
import CodeBlock from '@/components/CodeBlock';
import RichText from '@/components/RichText';
import { NotionBlockProps } from '@/types/notions';

export const List = styled.ul`
    margin: 0.2rem 0;
    padding-left: 2rem;

    li {
        font-size: 1.0625rem;
        line-height: 1.65;
        margin: 0.5rem 0;

        ${themeColor.breakpoints.mobile} {
            font-size: 1rem;
        }
    }

    ${themeColor.breakpoints.mobile} {
        padding-left: 1.5rem;
        margin: 1.25rem 0;
    }
`;

export const OrderedList = styled(List).attrs({ as: 'ol' })``;

const Paragraph = styled.p`
    font-size: 1.065rem;
    line-height: 1.65;
    margin: 1.25rem 0;
    font-weight: 400;
    letter-spacing: -0.003em;
    color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'};

    ${themeColor.breakpoints.mobile} {
        font-size: 1rem;
        line-height: 1.7;
        margin: 1.25rem 0;
    }
`;

const Heading1 = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: inherit;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.875rem;
        margin: 2rem 0 1rem;
    }
`;

const Heading2 = styled.h2`
    font-size: 1.4rem;
    font-weight: 600;
    margin: 1.5rem 0 0rem;
    color: inherit;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.5rem;
        margin: 2rem 0 1rem;
    }
`;

const Heading3 = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: inherit;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.25rem;
        margin: 1.5rem 0 0.75rem;
    }
`;

const BlockQuote = styled.blockquote`
    border: 0.5px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};
    border-left: 4px solid
        ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.redHighlightCol : themeColor.backgroundSpan.light};
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codePreDark
            : themeColor.codeContent.codePreLight};
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeCodeDark
            : themeColor.codeContent.codeCodeLight};
    font-style: italic;
    border-radius: 4px;

    ${themeColor.breakpoints.mobile} {
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;
    }
`;

const Divider = styled.hr`
    margin: 2.5rem 0;
    border: none;
    border-top: 1px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};
`;

const ImageContainer = styled.figure`
    margin: 2rem 0;

    img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 6px
            ${({ theme }) =>
                theme.mode === 'dark' ? themeColor.shadow.dark : themeColor.shadow.light};
    }

    figcaption {
        text-align: center;
        margin-top: 0.75rem;
        font-size: 0.9rem;
        color: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.text.light : themeColor.text.light};
    }
`;

const Callout = styled.div`
    padding: 1.25rem;
    border-radius: 8px;
    background: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codePreDark
            : themeColor.codeContent.codePreLight};
    color: ${({ theme }) =>
        theme.mode === 'dark'
            ? themeColor.codeContent.codeCodeDark
            : themeColor.codeContent.codeCodeLight};
    margin: 1.5rem 0;
    display: flex;
    gap: 1rem;
    border: 1px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};

    .callout-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .callout-content {
        flex: 1;
    }
`;

const Toggle = styled.details`
    margin: 1.5rem 0;

    summary {
        cursor: pointer;
        font-weight: 500;
        padding: 0.75rem;
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.backgroundSpan.dark
                : themeColor.backgroundSpan.light};
        border-radius: 8px;

        &:hover {
            background: ${({ theme }) =>
                theme.mode === 'dark' ? themeColor.hover.dark : themeColor.hover.light};
        }
    }

    .toggle-content {
        padding: 1rem 0.5rem;
    }
`;

export const NotionBlock = ({ block }: NotionBlockProps) => {
    const renderBlock = () => {
        switch (block.type) {
            case 'paragraph':
                const paragraphText = block.paragraph?.rich_text;
                if (!paragraphText || paragraphText.length === 0) return <br />;
                return (
                    <Paragraph>
                        <RichText richTextArray={paragraphText} isInline={false} />
                    </Paragraph>
                );

            case 'heading_1':
                return (
                    <Heading1>
                        <RichText richTextArray={block.heading_1?.rich_text} isInline={false} />
                    </Heading1>
                );

            case 'heading_2':
                return (
                    <Heading2>
                        <RichText richTextArray={block.heading_2?.rich_text} isInline={false} />
                    </Heading2>
                );

            case 'heading_3':
                return (
                    <Heading3>
                        <RichText richTextArray={block.heading_3?.rich_text} isInline={false} />
                    </Heading3>
                );

            case 'quote':
                return (
                    <BlockQuote>
                        <RichText richTextArray={block.quote?.rich_text} isInline={false} />
                    </BlockQuote>
                );

            case 'code':
                const codeText =
                    block.code?.rich_text
                        ?.map((t: { plain_text: string }) => t.plain_text)
                        .join('') || '';
                const language = block.code?.language || 'text';
                return <CodeBlock language={language} code={codeText} />;

            case 'divider':
                return <Divider />;

            case 'image':
                const imageUrl = block.image?.file?.url || block.image?.external?.url;
                if (!imageUrl) return null;

                return (
                    <ImageContainer>
                        <img
                            src={imageUrl}
                            alt={block.image?.caption?.[0]?.plain_text || 'Image'}
                            loading="lazy"
                        />
                        {block.image?.caption && block.image.caption.length > 0 && (
                            <figcaption>
                                <RichText richTextArray={block.image.caption} isInline={false} />
                            </figcaption>
                        )}
                    </ImageContainer>
                );

            case 'toggle':
                return (
                    <Toggle>
                        <summary>
                            <RichText richTextArray={block.toggle?.rich_text} isInline={false} />
                        </summary>
                        <div className="toggle-content">
                            {block.children?.map((child: NotionBlockProps['block']) => (
                                <NotionBlock key={child.id} block={child} />
                            ))}
                        </div>
                    </Toggle>
                );

            case 'callout':
                return (
                    <Callout>
                        {block.callout?.icon && (
                            <span className="callout-icon">{block.callout.icon.emoji || '💡'}</span>
                        )}
                        <div className="callout-content">
                            <RichText richTextArray={block.callout?.rich_text} isInline={false} />
                        </div>
                    </Callout>
                );

            default:
                return null;
        }
    };

    return renderBlock();
};
