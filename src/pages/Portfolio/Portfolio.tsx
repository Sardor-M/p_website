import React from "react";
import styled from "styled-components";
import { ExternalLink, Code, Server } from "lucide-react";
import StyledCard from "../../components/Card/StyledCard";
import { GithubFilled } from "@ant-design/icons";

type SkillSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
};

const PortfolioContainer = styled.div`
  padding: 2rem;
  margin-top: -36px;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  padding-top: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.6rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const LinkIcon = styled.a`
  color: ${({ theme }) => theme.textColor};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillCategory = styled.div`
  margin-bottom: 1rem;
`;

const SkillTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textMuted};
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.tagBg};
  color: ${({ theme }) => theme.tagText};
`;

const Portfolio: React.FC = () => {
  const generateId = () => `_${Math.random().toString(36).substring(2, 11)}`;

  const skillSections: SkillSection[] = [
    {
      id: generateId(),
      title: "Frontend ",
      icon: <Code size={20} />,
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Styled Components",
        "Tailwind CSS",
      ],
    },
    {
      id: generateId(),
      title: "Backend",
      icon: <Server size={20} />,
      skills: ["Node.js", "Express.js", "REST APIs", "MySql"],
    },
    // {
    //   id: generateId(),
    //   title: "Database",
    //   icon: <Database size={20} />,
    //   skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
    // }
  ];

  const projects = [
    {
      title: "Personal Blog",
      description:
        "A static blog platform built with React and Typescript. Features include, markdown support, and comment system.",
      tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      github: "https://github.com/",
      demo: "https://demo.com",
    },
    {
      title: "Sample Project",
      description:
        "A static blog platform built with React and Typescript. Features include, markdown support, and comment system.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/",
      demo: "https://demo.com",
    },
  ];

  return (
    <PortfolioContainer>
      <Section>
        <SectionTitle>Technical Skills</SectionTitle>
        <SkillsGrid>
          {skillSections.map((section) => (
            <StyledCard key={section.id} variant="light" padding="md">
              <SkillCategory>
                <SkillTitle>
                  {section.icon}
                  {section.title}
                </SkillTitle>
                <SkillList>
                  {section.skills.map((skill) => (
                    <SkillItem key={`${section.id}_${skill}`}>
                      {skill}
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            </StyledCard>
          ))}
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle>Featured Projects</SectionTitle>
        <ProjectsGrid>
          {projects.map((project) => (
            <StyledCard
              key={project.title}
              variant="light"
              padding="md"
              hoverable
            >
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {project.title}
              </h3>
              <p style={{ color: "inherit", marginBottom: "1rem" }}>
                {project.description}
              </p>
              <TagList>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
              <IconContainer>
                <LinkIcon
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubFilled size={20} />
                </LinkIcon>
                <LinkIcon
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                </LinkIcon>
              </IconContainer>
            </StyledCard>
          ))}
        </ProjectsGrid>
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
