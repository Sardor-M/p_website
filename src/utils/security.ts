import DOMPurify from 'dompurify';

/**
 * sanitize a string using DOMPurify to prevent attack
 */
export const sanitizeString = (str: string): string => {
  if (!str) return '';
  return DOMPurify.sanitize(str);
};

/**
 * we recursively sanitize all strings in an object
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;

  const result = { ...obj };

  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (typeof result[key] === 'string') {
        result[key] = sanitizeString(result[key]) as T[Extract<keyof T, string>];
      } else if (Array.isArray(result[key])) {
        result[key] = result[key].map((item: any) =>
          typeof item === 'object'
            ? sanitizeObject(item)
            : typeof item === 'string'
              ? sanitizeString(item)
              : item
        );
      } else if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = sanitizeObject(result[key]);
      }
    }
  }

  return result;
};

/**
 * this creates a safe HTML content object for dangerouslySetInnerHTML
 */
export const createSafeHtml = (html: string) => {
  if (!html) return { __html: '' };

  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'b',
      'i',
      'em',
      'strong',
      'a',
      'ul',
      'ol',
      'li',
      'br',
      'span',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });

  return { __html: sanitizedHtml };
};

/**
 * helper function to safely render HTML content in React
 * Usage: <div {...safeHtml(htmlContent)} />
 */
export const safeHtml = (html: string) => {
  return {
    dangerouslySetInnerHTML: createSafeHtml(html),
  };
};

// we initialize DOMPurify with some hooks
export const initializeDOMPurify = () => {
  // we add a hook to add rel="noopener noreferrer" to all <a> tags
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.hasAttribute('href')) {
      node.setAttribute('rel', 'noopener noreferrer');
      if (!node.getAttribute('target')) {
        node.setAttribute('target', '_blank');
      }
    }
  });
};
