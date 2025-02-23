import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import StyledCard from "@/components/Card/StyledCard";
import AuthorSectionWithShare from "./BlogShareLink";
import { BlogPost, ContentBlockItem } from "@/types/blog";
import { useLocation, useParams } from "react-router-dom";
import { getThemeStyles } from "@/themes";
import UtterancesComment from "./UtteranceComment";

const BlogContainer = styled.div`
  margin-top: -36px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleHeader = styled.div`
  margin-bottom: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 1.25rem;
  ${({ theme }) => getThemeStyles(theme, "text")};
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
  ${({ theme }) => getThemeStyles(theme, "text")};
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

const StyledTag = styled.span`
  margin-top: 10px;
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 6px;
  background: ${({ theme }) => (theme.mode === "dark" ? "#2D2D2D" : "#f2f2f2")};
  color: ${({ theme }) => theme.textColor};
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
  // padding-top: 2rem;
  border-top: 1px solid
    ${({ theme }) => (theme.mode === "dark" ? "#2D2D2D" : "#f0f0f0")};
`;

const CommentsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  ${({ theme }) => getThemeStyles(theme, "text")};
`;

export default function BlogDetails() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const theme = useTheme();

  useEffect(() => {
    const stateData = location.state?.blogData;
    setPost(stateData || null);
  }, [id]);

  if (!post) return null;

  return (
    <BlogContainer>
      <StyledCard variant="light" padding="lg">
        <ArticleHeader>
          <Title>{post.title}</Title>
          <Subtitle>{post.subtitle}</Subtitle>
          <AuthorSectionWithShare post={post} />
        </ArticleHeader>

        <Content>
          {post.content.map((contentItem, index) => (
            <ContentBlock key={index} item={contentItem} />
          ))}
        </Content>
        <TopicList>
          {post.topics.map((tag) => (
            <StyledTag key={tag}>{tag}</StyledTag>
          ))}
        </TopicList>
        <CommentsSection>
          <CommentsTitle>Comments</CommentsTitle>
          <UtterancesComment
            repo="Sardor-M/p_website_frontend"
            issueTerm="title"
            theme={theme.mode === "dark" ? "github-dark" : "github-light"}
          />
        </CommentsSection>
      </StyledCard>
    </BlogContainer>
  );
}

const ContentBlock = ({ item }: { item: ContentBlockItem }) => {
  switch (item.type) {
    case "heading":
      return React.createElement(`h${item.level || 2}`, null, item.text);
    case "paragraph":
      return <p>{item.text}</p>;
    case "code":
      return (
        <pre>
          <code>{item.text}</code>
        </pre>
      );
    case "blackquote":
      return <blockquote>{item.text}</blockquote>;
    case "list":
      return (
        <ul>
          {item.items?.map((listItem: string, index: number) => (
            <li key={index}>{listItem}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <img
          src={item.url}
          alt={item.alt}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    default:
      return <p>{item.text}</p>;
  }
};
