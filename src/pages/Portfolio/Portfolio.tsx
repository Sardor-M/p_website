import styled from 'styled-components';
import { ExternalLink, LinkIcon } from 'lucide-react';
import { GithubFilled } from '@ant-design/icons';
import { getThemeStyles } from '@/themes';
import { useTranslation } from 'react-i18next';

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
  ${({ theme }) => getThemeStyles(theme, 'text')};
`;
const SectionDescription = styled.p`
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 1.5rem;
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

const PortfolioViewport = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.borderColor || '#e5e5e5'};
`;

const DesignEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

const ProjectCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.cardBg || '#f9f9f9'};
  border: 1px solid ${({ theme }) => theme.borderColor || '#e5e5e5'};
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  ${({ theme }) => getThemeStyles(theme, 'text')};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 1rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function Portfolio() {
  const { t } = useTranslation('portfolio');

  const projects = [
    {
      title: t('projects.blog.title'),
      description: t('projects.blog.description'),
      tags: ['React', 'TypeScript', 'Node js', 'Tailwind CSS'],
      github: 'http://github.com',
      demo: 'http://demo.com',
    },
    {
      title: t('projects.sample.title'),
      description: t('projects.sample.description'),
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/',
      demo: 'https://demo.com',
    },
  ];

  return (
    <PortfolioContainer>
      <Section>
        <SectionTitle>{t('sections.portfolio.title')}</SectionTitle>
        <SectionDescription>{t('sections.portfolio.desc')}</SectionDescription>
        <PortfolioViewport>
          <DesignEmbed
            className="notion-asset-object-fit"
            // src="https://www.canva.com/design/DAGZvqsfOYw/7-7c1qdzYGkuiglz7xbh6Q/view?embed"
            // shuyerda canvadagi portfolio pptni embed wilib qoshiyim kerak
            src="" 
            title="ppt"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            scrolling="auto"
          />
        </PortfolioViewport>
      </Section>

      <Section>
        <SectionTitle>{t('projects.linkTitle')}</SectionTitle>
        <ProjectCards>
          {projects.map((project) => (
            <ProjectCard key={project.title}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagList>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
              <ProjectLinks>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <LinkIcon>
                    <GithubFilled style={{ fontSize: '20px' }} />
                  </LinkIcon>
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <LinkIcon>
                    <ExternalLink size={20} />
                  </LinkIcon>
                </a>
              </ProjectLinks>
            </ProjectCard>
          ))}
        </ProjectCards>
      </Section>
    </PortfolioContainer>
  );
}
