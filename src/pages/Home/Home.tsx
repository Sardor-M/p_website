import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StyledCard from "../../components/Card/StyledCard";
import TagFilterSystem from "./FilterTags";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  tags: string[];
  category: string;
  description: string;
}

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
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  background-color: ${(props) => props.theme.tagBg};
  color: ${(props) => props.theme.tagText};
`;

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "React Hooks",
    date: "2025-01-01",
    tags: ["React", "Frontend"],
    category: "React",
    description: "Intro to Hooks",
  },
  {
    id: 2,
    title: "Node.js Best Practices",
    date: "2025-02-01",
    tags: ["Node.js", "Backend"],
    category: "Node",
    description: "Backend optimization",
  },
  {
    id: 3,
    title: "Node.js ",
    date: "2025-02-01",
    tags: ["Node.js", "Backend"],
    category: "Node",
    description: "Backend optimization",
  },
  {
    id: 4,
    title: "React Best Practices",
    date: "2025-02-01",
    tags: ["Node.js", "Backend"],
    category: "Node",
    description: "Backend optimization",
  },
];

const TAGS = ["React", "Frontend", "TypeScript", "Backend"];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const switchLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
  };

  const filteredPosts = selectedTag
    ? SAMPLE_BLOGS.filter((post) => post.tags.includes(selectedTag))
    : SAMPLE_BLOGS;

  return (
    <Container>
      {/* <Header>
        <Title>{t("welcome")}</Title>
      </Header> */}
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
              <StyledCard variant="light" padding="sm" key={post.id} hoverable>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogDate>{post.date}</BlogDate>
                <BlogDescription>{post.description}</BlogDescription>
                <TagList>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </StyledCard>
            ))}
          </BlogGrid>
        </BlogContainer>
      </Section>
    </Container>
  );
}
