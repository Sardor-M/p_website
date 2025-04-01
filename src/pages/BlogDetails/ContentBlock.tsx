import React from 'react';
import { useTranslation } from 'react-i18next';
import { sanitizeString } from '@/utils/security';
import CodeBlock from './CodeBlock';
import { ContentBlockProps } from '@/types/blog';

const ContentBlock: React.FC<ContentBlockProps> = ({ item, postId, index }) => {
  const { t } = useTranslation('blogDetails');

  const determineHeadingLevel = (level: number | undefined) => {
    return level && level >= 1 && level <= 6 ? level : 2;
  };

  const getTranslatedText = (text: string, contentType: string) => {
    // first we try to find the text in the direct translation
    if (text && text.startsWith('blog.') && text.includes('.')) {
      const directTranslation = t(text);
      if (directTranslation !== text) {
        return directTranslation;
      }
    }

    // birinchi we  try the section based on index
    const sectionKey = `blog.post${postId}.content.section${index + 1}.${contentType}`;
    const sectionTranslation = t(sectionKey);

    if (sectionTranslation !== sectionKey) {
      return sectionTranslation;
    }

    // if fails, we try to find the text in other sections
    if (item) {
      for (let sectionNum = 1; sectionNum <= 10; sectionNum++) {
        // Skip the section we already tried
        if (sectionNum === index + 1) continue;

        // For headings, we can check by text content
        if (item.type === 'heading') {
          const sectionHeadingKey = `blog.post${postId}.content.section${sectionNum}.heading`;
          const sectionHeading = t(sectionHeadingKey);

          // we check if our heading text matches this section's heading
          if (
            sectionHeading === text ||
            (sectionHeading !== sectionHeadingKey &&
              text.toLowerCase().includes(sectionHeading.toLowerCase()))
          ) {
            const matchedSectionKey = `blog.post${postId}.content.section${sectionNum}.${contentType}`;
            const matchedTranslation = t(matchedSectionKey);

            if (matchedTranslation !== matchedSectionKey) {
              return matchedTranslation;
            }
          }
        } else {
          // for the non headings, we just try each section
          const trySectionKey = `blog.post${postId}.content.section${sectionNum}.${contentType}`;
          const tryTranslation = t(trySectionKey);

          if (tryTranslation !== trySectionKey) {
            return tryTranslation;
          }
        }
      }
    }

    // if not found, we return  the sanitized original text
    return sanitizeString(text || ' ');
  };

  const extractLanguageFromContent = (content: string): string => {
    const firstLine = content.split('\n')[0].toLowerCase();

    const langaugeMap = {
      js: ['js', 'js'],
      typescript: ['ts', 'ts'],
      java: ['java'],
      python: ['py', 'py'],
      sql: ['sql'],
      mysql: ['mysql'],
      bash: ['bash', 'sh'],
      cmd: ['cmd', 'batch'],
    };

    for (const [language, indicators] of Object.entries(langaugeMap)) {
      if (indicators.some((indicator) => firstLine.includes(indicator))) {
        return language;
      }
    }

    return 'text';
  };

  switch (item.type) {
    case 'heading':
      return React.createElement(
        `h${determineHeadingLevel(item.level)}`,
        null,
        getTranslatedText(item.text || '', 'heading')
      );
    case 'paragraph':
      return <p>{getTranslatedText(item.text || '', 'paragraph')}</p>;
    case 'code':
      const sanitizedCode = sanitizeString(item.text || '');
      const lang = item.language || extractLanguageFromContent(sanitizedCode);
      return <CodeBlock language={lang}> {sanitizedCode}</CodeBlock>;
    case 'list':
      // we handle the nested unordered list data:
      const renderListItems = (items: any[]) => {
        return (
          <ul>
            {items?.map((listItem: any, itemIndex: number) => (
              <li key={itemIndex}>
                {typeof listItem === 'string'
                  ? sanitizeString(listItem)
                  : listItem.text
                    ? sanitizeString(listItem.text)
                    : null}
                {listItem.items && listItem.items.length > 0 && (
                  <ul>
                    {listItem.items.map((nestedItem: any, nestedIndex: number) => (
                      <li key={`nested-${nestedIndex}`}>
                        {typeof nestedItem === 'string'
                          ? sanitizeString(nestedItem)
                          : nestedItem.text
                            ? sanitizeString(nestedItem.text)
                            : null}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      };
      return renderListItems(item.items ?? []);
    case 'blackquote':
      return <blockquote>{getTranslatedText(item.text || '',  'quote')}</blockquote>;
    case 'image':
      return (
        <img
          src={item.url || 'image-url'}
          alt={sanitizeString(item.alt || '')}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    default:
      return <p>{getTranslatedText(item.text || "", 'paragraph')}</p>;
  }
};

export default ContentBlock;