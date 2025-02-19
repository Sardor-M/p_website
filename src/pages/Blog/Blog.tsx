import { useState } from "react";
import styled from "styled-components";
import StyledCard from "@/components/Card/StyledCard";
import TagFilterSystem from "./BlogFilterTags";
import { Link } from "react-router-dom";
import { sample_fake_blogs } from "./fakeData";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  // we hide the scrollbar for chrome and safari
  &::-webkit-scrollbar {
    display: none;
  }

  // other web browsers
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Section = styled.section`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  gap: rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BlogContainer = styled.div`
  width: 100%;
`;
const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  max-width: 100%;
`;

const BlogTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const BlogDate = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textMuted};
`;

const BlogDescription = styled.p`
  margin-top: 0.5rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 6px;
   background-color: ${({ theme }) =>
    theme.mode === "dark" ? "#2D2D2D" : "rgb(235, 235, 235)"};
  color: ${({ theme }) => (theme.mode === "dark" ? "#FFFFFF" : "#000000")};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
  }
`;

const BlogPostCard = styled(StyledCard)`
  color: ${props => props.theme.textColor};
`;

// const BlogTitle = styled.h3`
//   font-size: 1.2rem;
//   margin: 0;
//   color: ${props => props.theme.textColor};
// `;

// const BlogDate = styled.p`
//   font-size: 0.875rem;
//   color: ${props => props.theme.textMuted};
// `;

// const BlogDescription = styled.p`
//   margin-top: 0.5rem;
//   color: ${props => props.theme.textColor};
// `;

// const TagList = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   margin-top: 0.75rem;
//   flex-wrap: wrap;
// `;

// const Tag = styled.span`
//   padding: 0.25rem 0.75rem;
//   font-size: 0.875rem;
//   border-radius: 9999px;
//   background-color: ${props => props.theme.tagBg};
//   color: ${props => props.theme.tagText};
// `;

const TAGS = ["React", "Frontend", "TypeScript", "Backend"];

export default function Blog() {
  // const { t, i18n } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? sample_fake_blogs.filter((post) => post.tags.includes(selectedTag))
    : sample_fake_blogs;

  return (
    <Container>
      <Section>
        <SectionTitle>Blog Posts</SectionTitle>
        <TagContainer>
          <TagFilterSystem
            tags={TAGS}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />
        </TagContainer>
        <BlogContainer>
          <BlogGrid>
            {filteredPosts.map((post) => (
              <StyledLink
                key={`blog-${post.id}`}
                to={`/${post.id}`}
                state={{ blogData: post }}
              >
                <BlogPostCard
                  variant="light"
                  padding="sm"
                  hoverable={true}
                >
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogDescription>{post.description}</BlogDescription>
                  <TagList>
                    {post.tags.map((tag, index) => (
                      <Tag key={`${post.id}-${tag}-${index}`}>{tag}</Tag>
                    ))}
                  </TagList>
                </BlogPostCard>
              </StyledLink>
            ))}
          </BlogGrid>
        </BlogContainer>
      </Section>
    </Container>
  );
}