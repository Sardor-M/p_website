import { useEffect, useState } from "react";
import styled from "styled-components";
import StyledCard from "../../components/Card/StyledCard";
import AuthorSectionWithShare from "./ShareBlogLink";

type BlogPost = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  author: {
    name: string;
    image: string;
    bio: string;
  };
  readTime: string;
  content: string;
  topics: string[];
};

const BlogContainer = styled.div`
  margin-top: -36px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleHeader = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
   font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.textColor};
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
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textColor};
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
    font-family: "Fira Code", "Consolas", "Monaco", "Andale Mono", "Ubuntu Mono",
      monospace;
    font-size: 0.9em;
    background: ${({ theme }) =>
      theme.mode === "dark" ? "#2D2D2D" : "#f5f5f5"};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    background: ${({ theme }) =>
      theme.mode === "dark" ? "#1E1E1E" : "#f8f8f8"};
    padding: 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 1.5rem 0;

    code {
      background: none;
      padding: 0;
      font-size: inherit;
    }
  }

  blockquote {
    border-left: 4px solid
      ${({ theme }) => (theme.mode === "dark" ? "#404040" : "#e5e5e5")};
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
  // border-top: 0.2px solid rgb(211, 211, 211);
  // border-bottom: 0.2px solid rgb(211, 211, 211);
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const Topic = styled.span`
  margin-top: 10px;
  padding: 0.3rem 0.7rem;
  background: ${({ theme }) => (theme.mode === "dark" ? "#2D2D2D" : "#f2f2f2")};
  border-radius: 10px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textColor};
`;

const SAMPLE_BLOG_POST: BlogPost = {
  id: 1,
  title: "The Complete Guide to Full-Stack Development with Next.js",
  subtitle: "",
  date: "Feb 18, 2024",
  author: {
    name: "Sardor Madaminov",
    image: "/api/placeholder/48/48",
    bio: "Full-stack developer",
  },
  readTime: "8 min read",
  topics: ["Next.js", "React", "Web Development", "JavaScript"],
  content: `
    <p>Next.js has revolutionized the way we build web applications. In this comprehensive guide, we'll explore everything from basic concepts to advanced patterns.</p>

    <h2>Understanding the Fundamentals</h2>
    <p>Before diving into complex features, let's establish a solid foundation of how Next.js works and what makes it special.</p>

    <blockquote>Next.js combines the best of static site generation (SSG) and server-side rendering (SSR) to create lightning-fast web applications.</blockquote>

    <h3>Key Features</h3>
    <p>Here are some of the most important features that make Next.js stand out:</p>

    <pre>
      <code>
      export const extractYearMonthDate = (datetime: string) => {
          const dateObj = new Date(datetime)
          const year = dateObj.getFullYear()
          const month = dateObj.getMonth() + 1
          const date = dateObj.getDate()

          return {month + date};
        }

        export const extractHourMinute = (datetime: string) => {
          const dateObj = new Date(datetime)
          const hours = dateObj.getHours()
          const minutes = dateObj.getMinutes()

          const isAfternoon = hours >= 12
          const formattedHours = hours % 12 || 12
          const formattedMinutes = minutes < 10 ? 0 + minutes : minutes
          const period = isAfternoon;

          return {period + formattedHours : formattedMinutes}
        }
      </code>
    </pre>
    <p>The simplicity of Next.js is what makes it so powerful. With just a few lines of code, you can create dynamic, SEO-friendly pages that load incredibly fast.</p>
  `,
};

function BlogDetail() {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // In real app, fetch from backend using URL params
    setPost(SAMPLE_BLOG_POST);
  }, []);

  if (!post) return null;

  return (
    <BlogContainer>
      <StyledCard variant="light" padding="lg">
        <ArticleHeader>
          <Title>{post.title}</Title>
          <Subtitle>{post.subtitle}</Subtitle>
          <AuthorSectionWithShare post={post} />

          {/* <AuthorSection>
            <AuthorImage src={post.author.image} alt={post.author.name} />
            <AuthorInfo>
              <AuthorName>{post.author.name}</AuthorName>
              <PostMeta>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </PostMeta>
              
            </AuthorInfo>
          </AuthorSection> */}
        </ArticleHeader>

        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
        <TopicList>
          {post.topics.map((topic) => (
            <Topic key={topic}>{topic}</Topic>
          ))}
        </TopicList>
      </StyledCard>
    </BlogContainer>
  );
}

export default BlogDetail;
