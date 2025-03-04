import React from 'react';
import { useTranslation } from 'react-i18next';
import { BlogContent } from '@/types/blog';
import { sanitizeString } from '@/utils/security';

interface ContentBlockProps {
  item: BlogContent;
  postId: string | null;
  index: number;
}

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

  switch (item.type) {
    case 'heading':
      return React.createElement(
        `h${determineHeadingLevel(item.level)}`,
        null,
        getTranslatedText(item.text, 'heading')
      );
    case 'paragraph':
      return <p>{getTranslatedText(item.text, 'paragraph')}</p>;
    case 'code':
      return (
        <pre>
          <code>{sanitizeString(item.text)}</code>
        </pre>
      );
    case 'blackquote':
      return <blockquote>{getTranslatedText(item.text, 'quote')}</blockquote>;
    case 'list':
      return (
        <ul>
          {item.items?.map((listItem: string, itemIndex: number) => (
            <li key={itemIndex}>{sanitizeString(listItem)}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <img
          src={item.url || 'image-url'}
          alt={sanitizeString(item.alt || '')}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    default:
      return <p>{getTranslatedText(item.text, 'paragraph')}</p>;
  }
};

export default ContentBlock;