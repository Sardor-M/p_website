import { useEffect, useState, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import AuthorSectionWithShare from '@/pages/Blog/BlogDetails/BlogShareLink';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getThemeStyles } from '@/themes';
import UtterancesComment from '@/components/Comment/UtteranceComment';
import { sanitizeObject } from '@/utils/security';
import { CONFIG } from '@/config/site.config';
import { Loading } from '@/components/Loading';
import { BlogPost } from '@/types/blog';
import { createBlogContentUtils } from './blogContentUtil';

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
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])};
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
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  font-weight: 400;
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])};
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    ${({ theme }) => getThemeStyles(theme, 'hover')};
    transform: translateY(-1px);
  }

  &:active,
  &:focus {
    outline: none;
  }
`;

export default function BlogDetails() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const theme = useTheme();

  const generateStorageKey = (blogData: BlogPost) => {
    if (blogData && blogData.id) {
      return `blog-post-${blogData.id}`;
    }
    return `blog-post-${id}`;
  };

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

  useEffect(() => {
    const stateData = location.state?.blogData as BlogPost | undefined;
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
      // fallback method
      const storedData = id
        ? sessionStorage.getItem(`blog-post-${id}`) || findRelevantBlogInSession(id)
        : null;

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as BlogPost;
          setPost(parsedData);
        } catch (error) {
          console.error('Failed to parse the stored blog data: ', error);
        }
      } else {
        console.log('No data available for this blog post');
      }
    }
  }, [id, location.state]);

  const sanitizedPost = post ? (sanitizeObject(post) as BlogPost | null) : null;

  const contentDetails = useMemo(() => {
    if (!sanitizedPost) return null;
    return createBlogContentUtils(sanitizedPost);
  }, [sanitizedPost]);

  const scrollToTop = () => {
    // we find the main content and go top
    const mainContent = document.querySelector('main');

    if (mainContent) {
      mainContent.scrollTop = 0;
      console.log('Found main content, scrolling to top');
    } else {
      console.log('MainContent element not found');

      // fallback case (incase)
      const possibleContainers = [
        document.querySelector('.MainContent'),
        document.querySelector("[role='main']"),
        document.querySelector('main'),
      ];

      for (const container of possibleContainers) {
        if (container) {
          container.scrollTop = 0;
          console.log('Found an alternative container, now scrolling to top');
          break;
        }
      }
    }
  };

  return (
    <>
      {!post && <Loading />}
      {!sanitizedPost && post && <Loading />}
      {sanitizedPost && contentDetails && (
        <BlogContainer>
          {/* <StyledCard variant="light" padding="lg"> */}
          <StyledCard
            style={{
              variant: 'light',
              padding: 'lg',
            }}
          >
            <ArticleHeader>
              <Title>{contentDetails.getTitle()}</Title>
              <Subtitle>{contentDetails.getSubtitle()}</Subtitle>
              <AuthorSectionWithShare post={contentDetails.createPostForAuthorSection()} />
            </ArticleHeader>

            <Content>{contentDetails.renderContent()}</Content>
            <TopicList>
              {contentDetails.getTopics().map((tag, index) => (
                <StyledTag key={`${tag}-${index}`}>{tag}</StyledTag>
              ))}
            </TopicList>
            <NavigationContainer>
              <NavButton to="/">Previous</NavButton>
              <BackToTopButton onClick={scrollToTop} type="button" aria-label="Scroll to top">
                Back to Top
              </BackToTopButton>
            </NavigationContainer>
            <CommentsSection>
              <CommentsTitle>Comments</CommentsTitle>
              <UtterancesComment
                repo={CONFIG.utterances.config.repo}
                issueTerm={CONFIG.utterances.config['issue-term']}
                theme={theme.mode === 'dark' ? 'github-dark' : 'github-light'}
              />
            </CommentsSection>
          </StyledCard>
        </BlogContainer>
      )}
    </>
  );
}
