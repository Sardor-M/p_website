import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { themeColor } from '@/themes/color';
import Loading from '@/components/Loading';
import TagSection from '@/components/TagSection';
import NavigationSection from '@/components/NavigationSection';
import NotionRenderer from '@/components/NotionRender';
import AuthorSectionWithShare from '@/pages/Blog/BlogDetails/BlogShareLink';
import { useNotionPostById, useNotionPostBySlug } from '@/hooks/useNotionPosts';
import UtterancesComment from '@/components/Comment/UtteranceComment';
import { CONFIG } from '@/config/site.config';
import Button from '@/components/Common/Button';

const BlogContainer = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 0.7rem;
    width: 100%;

    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        'Roboto',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 1.0625rem;
    line-height: 1.65;
    font-weight: 400;
    letter-spacing: -0.003em;
    color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'};

    * {
        font-family: inherit;
    }

    code,
    pre,
    kbd,
    samp {
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.95rem;
        padding: 1rem 0 1rem 0;
    }
`;

const StyledCard = styled.div`
    background: ${({ theme }) =>
        theme.mode === 'dark' ? themeColor.background.dark : themeColor.background.light};
    border-radius: 12px;
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
        border-radius: 0;
        box-shadow: none;
    }

    ${themeColor.breakpoints.tablet} {
        padding: 2rem;
    }
`;

const ArticleHeader = styled.header`
    border-bottom: 1px solid
        ${({ theme }) => (theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light)};

    margin-bottom: 0.5rem;

    h1 {
        font-size: 2.25rem;
        font-weight: 600;
        line-height: 1.3;
        letter-spacing: -0.01em;

        ${themeColor.breakpoints.mobile} {
            font-size: 1.4rem;
            line-height: 1.4;
            flex-basis: 100%;
        }
    }

    h2 {
        font-size: 1.25rem;
        font-weight: 400;
        opacity: 0.8;
    }

    ${themeColor.breakpoints.mobile} {
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

const ContentSection = styled.article`
    color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.95rem;
    }
`;

const BackButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 200;
    margin-bottom: 1rem;
    padding: 0.4rem 0;
    transition: all 0.3s ease;
    opacity: 0.6;

    &:hover {
        opacity: 1;
        color: ${({ theme }) =>
            theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
    }
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    padding: 3rem 1.5rem;
    text-align: center;
`;

const EmptyStateIcon = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    position: relative;

    &::before {
        content: '📄';
        font-size: 3rem;
        filter: grayscale(0.5);
        opacity: 0.5;
    }

    &::after {
        content: '?';
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        background: ${({ theme }) =>
            theme.mode === 'dark' ? themeColor.error.dark : themeColor.error.light};
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const EmptyStateTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => (theme.mode === 'dark' ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 1.5rem;
    }
`;

const EmptyStateMessage = styled.p`
    font-size: 1rem;
    color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
    margin-bottom: 2rem;
    max-width: 400px;
    line-height: 1.6;
`;

const EmptyStateActions = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const ErrorCode = styled.code`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)'};
    color: ${({ theme }) =>
        theme.mode === 'dark' ? themeColor.error.light : themeColor.error.main};
    border-radius: 4px;
    font-size: 0.875rem;
    margin-top: 1rem;
    font-family: 'SF Mono', Monaco, monospace;
`;

/**
 * Blog post details page
 * Displays the content of a single blog post
 */
export default function BlogDetails() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const theme = useTheme();

    const blogId = location.state?.blogId;

    const {
        data: postBySlug,
        isLoading: isLoadingBySlug,
        error: errorBySlug,
    } = useNotionPostBySlug(slug || '', !!slug);

    const {
        data: postById,
        isLoading: isLoadingById,
        error: errorById,
    } = useNotionPostById(blogId, !!blogId && !postBySlug);

    const post = postById || postBySlug;
    const isLoading = blogId ? isLoadingById : isLoadingBySlug;
    const error = slug ? errorById : errorBySlug;

    useEffect(() => {
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    if (isLoading) {
        return (
            <BlogContainer>
                <StyledCard>
                    <Loading />
                </StyledCard>
            </BlogContainer>
        );
    }

    if (error || !post) {
        return (
            <BlogContainer>
                <StyledCard>
                    <EmptyStateContainer>
                        <EmptyStateIcon />
                        <EmptyStateTitle>
                            {error ? 'Oops! Something went wrong' : 'Post not found'}
                        </EmptyStateTitle>
                        <EmptyStateMessage>
                            {error
                                ? "We couldn't load this blog post. It might have been moved or deleted."
                                : "The blog post you're looking for doesn't exist or may have been removed."}
                        </EmptyStateMessage>

                        <EmptyStateActions>
                            <Button variant="primary" size="sm" to="/">
                                ← To Blogs
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </Button>
                        </EmptyStateActions>

                        {error && (
                            <ErrorCode>
                                Error: {(error as Error).message || 'Unknown error'}
                            </ErrorCode>
                        )}
                    </EmptyStateContainer>
                </StyledCard>
            </BlogContainer>
        );
    }

    return (
        <BlogContainer>
            <StyledCard>
                <BackButton to="/">← Back to Blog</BackButton>
                <ArticleHeader>
                    <h1>{post.title}</h1>
                    {post.subtitle && <h2>{post.subtitle}</h2>}
                    <AuthorSectionWithShare post={post} />
                    <TagSection tags={post.topic} />
                </ArticleHeader>

                <ContentSection>
                    <NotionRenderer content={post.content} />
                </ContentSection>
                <NavigationSection />
                <UtterancesComment
                    repo={CONFIG.utterances.config.repo}
                    issueTerm={CONFIG.utterances.config['issue-term']}
                    theme={theme.mode === 'dark' ? 'github-dark' : 'github-light'}
                />
            </StyledCard>
        </BlogContainer>
    );
}
