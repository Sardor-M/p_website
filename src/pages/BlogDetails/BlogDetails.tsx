import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import AuthorSectionWithShare from '@/pages/BlogDetails/BlogShareLink';
import { ContentBlockType, FirebaseBlogContent, Post } from '@/types/blog';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getThemeStyles } from '@/themes';
import UtterancesComment from '@/components/Comment/UtteranceComment';
import { sanitizeObject, sanitizeString } from '@/utils/security';
import { CONFIG } from '@/config/site.config';
import { useTranslation } from 'react-i18next';
import { Loading } from '@/components/Loading';
import ContentBlock from './ContentBlock';

const BlogContainer = styled.div`
  margin-top: -36px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleHeader = styled.div`
  margin-bottom: 1rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 1.25rem;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  letter-spacing: -0.02em;
  padding-top: 0;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 2rem;
  line-height: 1.4;
  font-weight: 400;
`;

const Content = styled.div`
  font-family:
    -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.125rem;
  line-height: 1.7;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  font-weight: 400;
  letter-spacing: -0.003em;

  p {
    margin: 1.5rem 0;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 2.5rem 0 1.25rem;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.375rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    line-height: 1.4;
  }

  code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    position: relative;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => (theme.mode === 'dark' ? '#404040' : '#e5e5e5')};
    margin: 1.5rem 0;
    padding: 0.5rem 0 0.5rem 1.25rem;
    color: ${({ theme }) => theme.textMuted};
    font-size: 1.125rem;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.primary};
    }
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1.5rem 0;

    li {
      margin: 0.5rem 0;
    }
  }
`;

const TopicList = styled.div`
  padding-top: 7px;
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const StyledTag = styled.span`
  margin-top: 10px;
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f2f2f2')};
  color: ${({ theme }) => theme.textColor};
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f0f0f0')};
`;

const CommentsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  ${({ theme }) => getThemeStyles(theme, 'text')};
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled(Link)`
  cursor: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])}
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => getThemeStyles(theme, 'shadow')};
  }
`;

const BackToTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  inline-padding: -10px;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  font-weight: 400;
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])}
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    ${({ theme }) => getThemeStyles(theme, 'hover')}
    transform: translateY(-1px);
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

export default function BlogDetails() {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation('blogDetails');

  const generateStorageKey = (blogData: Post) => {
    if (blogData && blogData.id) {
      return `blog-post-${blogData.id}`;
    }
    // fallback to id
    return `blog-post-${id}`;
  };

  useEffect(() => {
    const stateData = location.state?.blogData as Post | undefined;
    if (stateData) {
      setPost(stateData || null);

      try {
        const storageKey = generateStorageKey(stateData);
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            ...stateData,
            _timestamp: new Date().getTime(),
            _routeId: id,
          })
        );
      } catch (error) {
        console.error('Failed to store the blog data: ', error);
      }
    } else {
      // sessiondann datani olish
      const storedData = id
        ? sessionStorage.getItem(`blog-post-${id}`) || findRelevantBlogInSession(id)
        : null;
      // console.log('Stored data: ', storedData);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as Post;
          setPost(parsedData);
        } catch (error) {
          console.error('failed to parse the stored blog data: ', error);
        }
      } else {
        console.log('No data available for this blog post');
      }
    }
  }, [id, location.state]);

  const findRelevantBlogInSession = (searchId: string) => {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith('blog-post-')) {
        try {
          const storedData = sessionStorage.getItem(key);
          if (!storedData) continue;
          const data = JSON.parse(storedData);
          if (
            data._routeId === searchId ||
            (data.title && searchId.includes(data.title.toLowerCase().replace(/\s+/g, '-')))
          ) {
            return sessionStorage.getItem(key);
          }
        } catch (error) {
          console.error('Failed to parse the stored data: ', error);
        }
      }
    }
    return null;
  };

  // post datani sanitizatsiya qiladi
  const getSanitizedPost = (): Post | null => {
    if (!post) return null;

    try {
      const sanitized = sanitizeObject(post) as Post | null;
      return sanitized || post;
    } catch (error) {
      console.error('Failed to sanitize post:', error);
      return post;
    }
  };

  const sanitizedPost = getSanitizedPost();

  if (!sanitizedPost) {
    console.log('Sanitized object is failed to purify the object values. ');
    return <div>{t('ui.loading')}</div>;
  }

  if (!post) return <Loading />;

  const getSimplifiedPostId = () => {
    if (post && post._routeId) {
      const match = post._routeId.match(/fb(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
    }

    if (!id) return '1';

    if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) {
      const match = id.match(/fb(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
    }

    const pathMatch = id.match(/post-(\d+)/);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1];
    }

    const numericMatch = id.match(/(\d+)/);
    return numericMatch ? numericMatch[1] : '1';
  };

  const simplifiedPostId = getSimplifiedPostId();

  const scrollToTop = () => {
    //console.log('Scrolling to top...');

    // we first search the mainContent element
    const mainContent = document.querySelector('main');

    if (mainContent) {
      // then we scroll the main content to top
      mainContent.scrollTop = 0;
      console.log('Found main content, scrolling to top');
    } else {
      console.log('MainContent element not found');

      // fallback case
      const possibleContainers = [
        document.querySelector('.MainContent'),
        document.querySelector("[role='main']"),
        document.querySelector('main'),
      ];

      for (const container of possibleContainers) {
        if (container) {
          container.scrollTop = 0;
          console.log('we found a alternative container, now scrolling to top');
          break;
        }
      }
    }
  };

  const getTitle = () => {
    const translatedTitle = t(`blog.post${simplifiedPostId}.title`);
    return translatedTitle !== `blog.post${simplifiedPostId}.title`
      ? translatedTitle
      : sanitizeString(post.title);
  };

  const getSubtitle = () => {
    const translatedSubTitle = t(`blog.post${simplifiedPostId}.subtitle`);
    return translatedSubTitle !== `blog.post${simplifiedPostId}.subtitle`
      ? translatedSubTitle
      : sanitizeString(post.subtitle || '');
  };

  function isFirebaseBlogContent(
    content: ContentBlockType[] | FirebaseBlogContent
  ): content is FirebaseBlogContent {
    return !Array.isArray(content) && content && typeof content === 'object' && 'html' in content;
  }

  // AuthorSectionWithShare uchun post obyektini tayyorlash
  const createPostForAuthorSection = (): Post => {
    return {
      ...sanitizedPost,
      author: sanitizedPost.author || { name: 'Anonymous' },
      readTime: sanitizedPost.readTime || '5 min',
    } as Post;
  };

  const renderContent = () => {
    if (!sanitizedPost.content) return <div>No content available</div>;

    if (Array.isArray(sanitizedPost.content)) {
      return sanitizedPost.content.map((contentItem: ContentBlockType, index: number) => (
        <ContentBlock key={index} item={contentItem} postId={simplifiedPostId} index={index} />
      ));
    } else if (isFirebaseBlogContent(sanitizedPost.content)) {
      return <div dangerouslySetInnerHTML={{ __html: sanitizedPost.content.html }} />;
    }

    return <div>Content format not supported</div>;
  };

  return (
    <BlogContainer>
      <StyledCard variant="light" padding="lg">
        <ArticleHeader>
          <Title>{getTitle()}</Title>
          <Subtitle>{getSubtitle()}</Subtitle>
          {sanitizedPost && <AuthorSectionWithShare post={createPostForAuthorSection()} />}
        </ArticleHeader>

        <Content>{renderContent()}</Content>
        <TopicList>
          {sanitizedPost?.topics &&
            sanitizedPost.topics.map((tag) => (
              <StyledTag key={tag}>{sanitizeString(tag)}</StyledTag>
            ))}
        </TopicList>
        <NavigationContainer>
          <NavButton to="/">{t(`ui.prev`)}</NavButton>
          <BackToTopButton onClick={scrollToTop} type="button" aria-label="Scroll to top">
            {t(`ui.top`)}
          </BackToTopButton>
        </NavigationContainer>
        <CommentsSection>
          <CommentsTitle>{t(`ui.comments`)}</CommentsTitle>
          <UtterancesComment
            repo={CONFIG.utterances.config.repo}
            issueTerm={CONFIG.utterances.config['issue-term']}
            theme={theme.mode === 'dark' ? 'github-dark' : 'github-light'}
          />
        </CommentsSection>
      </StyledCard>
    </BlogContainer>
  );
}
