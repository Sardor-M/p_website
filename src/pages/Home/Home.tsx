import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Mail } from "lucide-react";
import Card from "../../components/Card";
import { GithubFilled, InstagramFilled } from "@ant-design/icons";
import { Button } from "../../components/common/Button";
import { AppProps } from "../../types";

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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// const Container = styled.div`
//   background-color: ${({ theme }) => theme.bodyBg};
//   color: ${({ theme }) => theme.textColor};
//   min-height: 100vh;
//   padding: 1rem;
// `;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.125rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCard = styled(Card)`
  padding: 1rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
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
];

const TAGS = ["React", "Frontend", "Node.js", "Backend"];

const Home = ({ onToggleTheme }: AppProps) => {
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
      <Header>
        <Title>{t("welcome")}</Title>
        <Description>{t("description")}</Description>

        <ButtonGroup>
          <Button onClick={onToggleTheme} variant="outline">
            Toggle Theme
          </Button>
          <Button onClick={() => switchLanguage("en")} variant="outline">
            EN
          </Button>
          <Button onClick={() => switchLanguage("ko")} variant="outline">
            KO
          </Button>
        </ButtonGroup>
      </Header>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <ButtonGroup>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubFilled
                style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
              />
              Github
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramFilled
                style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
              />
              Instagram
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:example@domain.com">
              <Mail
                style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}
              />
              Email
            </a>
          </Button>
        </ButtonGroup>
      </Section>

      <Section>
        <SectionTitle>Blog Posts</SectionTitle>

        <TagContainer>
          {TAGS.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </TagContainer>

        <BlogGrid>
          {filteredPosts.map((post) => (
            <StyledCard key={post.id}>
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
      </Section>
    </Container>
  );
};

export default Home;
