import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import AuthorSectionWithShare from '@/pages/Blog/BlogDetails/BlogShareLink';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getThemeStyles } from '@/themes';
import UtterancesComment from '@/components/Comment/UtteranceComment';
import { CONFIG } from '@/config/site.config';
import Loading from '@/components/Loading';
import { getPostBySlug, getPostById, NotionPostWithContent } from '@/api/notion-client/index';

const BlogContainer = styled.div`
  margin-top: -36px;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const ArticleHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 1rem;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-weight: 400;
`;

const NotionContent = styled.div`
  .notion {
    font-family:
      -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: ${({ theme }) => theme.textColor};
    line-height: 1.7;
    font-size: 1.1rem;
  }

  .notion-page {
    padding: 0;
    width: 100%;
  }

  .notion-title {
    display: none;
  }

  .notion-h {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .notion-text {
    margin: 1rem 0;
    line-height: 1.7;
  }

  .notion-code {
    background: ${({ theme }) => (theme.mode === 'dark' ? '#1e1e1e' : '#f6f8fa')};
    border-radius: 8px;
    padding: 1.5rem;
    font-size: 0.9em;
  }

  .notion-inline-code {
    background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .notion-quote {
    border-left: 4px solid ${({ theme }) => (theme.mode === 'dark' ? '#404040' : '#e5e5e5')};
    margin: 1.5rem 0;
    padding-left: 1.25rem;
    color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
  }

  .notion-link {
    color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.textColor};
    }
  }

  .notion-list {
    margin: 1rem 0;
  }

  .notion-list-disc,
  .notion-list-numbered {
    padding-left: 1.5rem;
  }

  .notion-asset-wrapper {
    margin: 2rem 0;
  }

  .notion-asset-wrapper img {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  ${({ theme }) =>
    theme.mode === 'dark' &&
    `
    .notion-code {
      background: #1e1e1e;
    }
    
    .notion-inline-code {
      background: #2D2D2D;
    }
    
    .notion-gray_background {
      background: #2D2D2D;
    }
  `}
`;

const TopicList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const StyledTag = styled.span`
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f2f2f2')};
  color: ${({ theme }) => theme.textColor};
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.7rem;
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])};
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${({ theme }) => (theme.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)')};
  }
`;

const BackToTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.3rem 0.7rem;
  font-size: 0.9rem;
  font-weight: 500;
  ${({ theme }) => getThemeStyles(theme, ['hover', 'text'])};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${({ theme }) => (theme.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)')};
  }
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};
`;

const CommentsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  ${({ theme }) => getThemeStyles(theme, 'text')};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#000')};
`;

const LoadingStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: calc(100vh - 80px);
`;

const NotionBlock = ({ block }: { block: any }) => {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</p>;
    case 'heading_1':
      return <h1>{block.heading_1?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</h1>;
    case 'heading_2':
      return <h2>{block.heading_2?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</h2>;
    case 'heading_3':
      return <h3>{block.heading_3?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</h3>;
    case 'bulleted_list_item':
      return (
        <li>{block.bulleted_list_item?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</li>
      );
    case 'code':
      return (
        <pre>
          <code>{block.code?.rich_text?.map((t: any) => t.plain_text).join('') || ''}</code>
        </pre>
      );
    default:
      return null;
  }
};

export default function BlogDetails() {
  const [post, setPost] = useState<NotionPostWithContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        let postData: NotionPostWithContent | null = null;

        const blogId = location.state?.blogId;

        if (blogId) {
          postData = await getPostById(blogId);
        } else if (slug) {
          postData = await getPostBySlug(slug);
        }

        if (!postData) {
          setError('Blog post not found');
        } else {
          setPost(postData);

          sessionStorage.setItem(
            `blog-post-${postData.id}`,
            JSON.stringify({
              ...postData,
              _timestamp: new Date().getTime(),
              _routeSlug: slug,
            })
          );
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    const cachedPost = slug ? sessionStorage.getItem(`blog-post-${slug}`) : null;
    if (cachedPost) {
      try {
        const parsed = JSON.parse(cachedPost);
        if (parsed._timestamp && Date.now() - parsed._timestamp < 5 * 60 * 1000) {
          setPost(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to parse cached post:', e);
      }
    }

    fetchPost();
  }, [slug, location.state]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <LoadingStateContainer>
        <Loading />
      </LoadingStateContainer>
    );
  }

  if (error || !post) {
    return (
      <BlogContainer>
        <StyledCard style={{ variant: 'light', padding: 'lg' }}>
          <ErrorMessage>
            <h2>Unable to load blog post</h2>
            <p>{error || 'Post not found'}</p>
            <NavButton to="/blog" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              ← Back
            </NavButton>
          </ErrorMessage>
        </StyledCard>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <StyledCard style={{ variant: 'light', padding: 'lg' }}>
        <ArticleHeader>
          <Title>{post.title}</Title>
          {post.subtitle && <Subtitle>{post.subtitle}</Subtitle>}

          <AuthorSectionWithShare
            post={{
              title: post.title,
              subtitle: post.subtitle,
              metadata: post.metadata,
              readTime: post.readTime,
              date: post.date,
            }}
          />
        </ArticleHeader>

        <NotionContent>
          {post.content &&
            post.content.map((block: any) => <NotionBlock key={block.id} block={block} />)}
        </NotionContent>
        <TopicList>
          {post.topic.map((tag: string, index: number) => (
            <StyledTag key={`tag-${index}`}>{tag}</StyledTag>
          ))}
        </TopicList>
        <NavigationContainer>
          <NavButton to="/blog">← Back</NavButton>
          <BackToTopButton onClick={scrollToTop} type="button" aria-label="Scroll to top">
            ↑ Top
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
  );
}
