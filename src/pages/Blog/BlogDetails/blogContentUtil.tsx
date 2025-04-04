import React from 'react';
import styled from 'styled-components';
import { sanitizeString } from '@/utils/security';
import CodeBlock from './CodeBlock';
import { BlogContentUtils, BlogPost, DataStructure, Example } from '@/types/blog';
import { themeColor } from '@/themes/color';

const TextContainer = styled.div`
  background-color: transparent;
  border: 1px solid
    ${({ theme }) =>
      theme.mode === 'dark'
        ? themeColor.textContainer.borderDark
        : themeColor.textContainer.borderLight};
  border-radius: 6px;
  padding: 0 15px;
  margin: 4px 0;
`;

const AdditionalText = styled.p`
  margin: 20px 20px;
  font-size: 14px;
  color: ${({ theme }) =>
    theme.mode === 'dark'
      ? themeColor.textContainer.textDarkCol
      : themeColor.textContainer.textLightCol};
`;

const HighlightedCmd = styled.span`
  color: ${themeColor.redHighlightCol};
  font-weight: bold;
  font-family: 'Fira Code', monospace;
`;

const SqlResult = styled.pre`
  background-color: ${themeColor.grayShades.light};
  border: 1px solid ${themeColor.grayShades.borderLight};
  border-radius: 4px;
  padding: 12px 16px;
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  white-space: pre;
  overflow-x: auto;
  color: ${themeColor.codeContent.codeLangLabelLight};
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const CodeSyntax = styled.span`
  background-color: ${themeColor.grayShades.lighter};
  padding: 0.3rem 0.4rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  font-size: 14px;
  color: ${themeColor.codeContent.codeLangLabelLight};
  border: 1px solid ${themeColor.grayShades.borderLight};
`;

/**
 * Creates utility functions for blog content rendering and manipulation.
 * This util method provides needed functions for blog display.
 *
 * @param {BlogPost} post - a blog post object to process
 * @returns {BlogContentUtils} a collection of utility functions for the blog post
 */

export function createBlogContentUtils(post: BlogPost): BlogContentUtils {
  // function to highlight commands
  const highlightCommands = (text: string): React.ReactNode => {
    if (!text) return null;

    return text.split(/\b([A-Z]{2,})\b/).map((part, index) => {
      if (/^[A-Z]{2,}$/.test(part)) {
        return <HighlightedCmd key={index}>{part}</HighlightedCmd>;
      }
      return part;
    });
  };

  const getTitle = (): string => sanitizeString(post.title || '');
  const getSubtitle = (): string => sanitizeString(post.subtitle || '');
  const getAuthorName = (): string => {
    const metadata = post.metadata;
    if (!metadata) return 'Sardor-M';

    if (typeof metadata === 'object' && metadata !== null) {
      return metadata.author?.name || (metadata.author && metadata.author.name) || 'Sardor-M';
    }
    return 'Sardor-M';
  };
  const getTopics = (): string[] => {
    const metadata = post.metadata;
    if (!metadata) return [];

    if (typeof metadata === 'object' && metadata !== null && Array.isArray(metadata.topics)) {
      return metadata.topics;
    }
    return [];
  };

  // function to highlight technical terms and code symbols
  const highlightTechnicalTerms = (text: string): React.ReactNode => {
    if (!text) return null;

    // first we sanitize the entire text
    const sanitizedText = sanitizeString(text);

    // regular expression larni match qilib
    // casega qarab code highlight qilamiz:
    const parts = sanitizedText.split(/(\*\*[^*]+\*\*|`[^`]+`|\b[A-Z]{2,}\b)/g).filter(Boolean);

    return (
      <>
        {parts.map((part, index) => {
          // case 1: text that are in double asterisks
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <CodeSyntax key={index}>
                {/* we remove the asterisks when displaying  */}
                {part.slice(2, -2)}
              </CodeSyntax>
            );
          }
          // case 2: code in backticks
          else if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <CodeSyntax key={index}>
                <strong>{part.slice(1, -1)}</strong>
              </CodeSyntax>
            );
          }
          // case 3: any all-caps technical terms will be bald
          else if (/^[A-Z]{2,}$/.test(part)) {
            return <strong key={index}>{part}</strong>;
          } else {
            // fallback case oddiy text uchun
            return <span key={index}>{part}</span>;
          }
        })}
      </>
    );
  };

  const createPostForAuthorSection = (): BlogPost => ({
    id: post.id,
    title: post.title || '',
    metadata: {
      author: {
        name: getAuthorName(),
        bio: '',
      },
      topics: getTopics(),
    },
    date: post.date || new Date().toISOString(),
    readTime: post.readTime || '5 min read',
  });

  const renderExample = (example: Example): React.ReactNode => {
    if (!example.command) return null;

    const description = example.description || '';
    const lines = description.split('\n');
    const firstLine = lines[0] || '';

    return (
      <>
        {firstLine && <p>{firstLine}</p>}
        {/* code block  */}
        <CodeBlock language={example.language || 'sql'}>{example.command}</CodeBlock>
        {example.output && <SqlResult>{example.output}</SqlResult>}
        {/* qo'shimcha descriptionlar tagida chiqadi */}
        {lines.length > 1 && (
          <TextContainer>
            <AdditionalText>{lines.slice(1).join('\n')}</AdditionalText>
          </TextContainer>
        )}
      </>
    );
  };

  // data structures property uchun render qilish funksiyasi
  const renderSection = (structure: any, level = 2): React.ReactNode => {
    let headingElement = null;
    if (structure.name) {
      switch (level) {
        case 1:
          headingElement = <h1>{structure.name}</h1>;
          break;
        case 2:
          headingElement = <h2>{structure.name}</h2>;
          break;
        case 3:
          headingElement = <h3>{structure.name}</h3>;
          break;
        case 4:
          headingElement = <h4>{structure.name}</h4>;
          break;
        case 5:
          headingElement = <h5>{structure.name}</h5>;
          break;
        default:
          headingElement = <h6>{structure.name}</h6>;
      }
    }
    return (
      <div key={structure.name} className="section mb-4">
        {headingElement}
        {structure.description && (
          <div dangerouslySetInnerHTML={{ __html: sanitizeString(structure.description) }} />
        )}
        {/* points - bullet points */}
        {structure.points && structure.points.length > 0 && (
          <ul>
            <ul>
              {structure.points.map((point: string, index: number) => (
                <li key={index}>{highlightTechnicalTerms(point)}</li>
              ))}
            </ul>
          </ul>
        )}

        {/*notes */}
        {structure.notes && (
          <TextContainer>
            <AdditionalText>{highlightCommands(structure.notes)}</AdditionalText>
          </TextContainer>
        )}

        {/* examples */}
        {structure.examples && structure.examples.length > 0 && (
          <>
            {structure.examples.map((example: any, index: number) => (
              <div key={index}>{renderExample(example)}</div>
            ))}
          </>
        )}

        {/* list sections with common pattern*/}
        {renderListSection('Real-World Applications', structure.realWorldApplications)}
        {renderListSection('Use Cases', structure.useCases)}
        {renderListSection('Advantages', structure.advantages)}
        {renderListSection('Features', structure.features)}
        {renderListSection('Traditional Approach', structure.traditionalApproach)}

        {/* nested subsectionni  recursively nested render qiladi */}
        {structure.subSections && structure.subSections.length > 0 && (
          <>
            {structure.subSections.map((subSection: any, index: number) => (
              <div key={index}>
                {renderSection(subSection, level + 1)}
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const renderListSection = (title: string, items?: string[] | null): React.ReactNode => {
    if (!items || items.length === 0) return null;
    
    return (
      <>
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </>
    );
  };

  // main content render qilish uchun method
  const renderContent = (): React.ReactNode => {
    if (!post) return <div>No content available</div>;

    const introSection = post.introduction ? (
      <div dangerouslySetInnerHTML={{ __html: sanitizeString(post.introduction) }} />
    ) : null;

    if (
      !post.dataStructures ||
      !Array.isArray(post.dataStructures) ||
      post.dataStructures.length === 0
    ) {
      return introSection || <div>No content available</div>;
    }

    return (
      <>
        {introSection}
        {post.dataStructures.map((structure, index) => (
          <div key={structure.name || index} className="data-structure-section mb-6">
            {renderSection(structure as DataStructure)}
          </div>
        ))}
      </>
    );
  };

  return {
    getTitle,
    getSubtitle,
    getAuthorName,
    getTopics,
    createPostForAuthorSection,
    renderContent,
  };
}
