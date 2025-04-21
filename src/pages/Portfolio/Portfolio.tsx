import styled from 'styled-components';
import { ExternalLink } from 'lucide-react';
import { getBorderStyles, getThemeStyles } from '@/themes';
import { useTranslation } from 'react-i18next';
import { GithubFilled } from '@ant-design/icons';

const PortfolioContainer = styled.div`
  padding: 2rem;
  margin-top: -36px;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  padding-top: 18px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
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
  padding: 0.25rem 0.8rem;
  font-size: 0.6rem;
  border-radius: 6px;
  margin: 0;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : 'rgb(235, 235, 235)')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
  text-align: center;
  font-size: 12px;
`;

const PortfolioViewport = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  ${({ theme }) => getBorderStyles(theme)};
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
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  ${({ theme }) => getThemeStyles(theme, 'background')};
  ${({ theme }) => getBorderStyles(theme)};
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

const LinkWrapper = styled.a`
  display: flex-end;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#f5f5f5')};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#3D3D3D' : '#e8e8e8')};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  }
`;

const GithubRepoIcon = styled(GithubFilled)`
  font-size: 18px;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#333333')};
`;

const StyledExternalLink = styled(ExternalLink)`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#333333')};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-center: center;
  margin-bottom: 0.5rem;
`;

export default function Portfolio() {
  const { t } = useTranslation('portfolio');

  const projects = [
    {
      title: t('projects.blog.title'),
      description: t('projects.blog.description'),
      tags: ['react', 'typeScript', 'styled-component', 'node js', 'socket.io'],
      github: 'https://github.com/Sardor-M/tunnel_chat/tree/main/tunnel_chat_frontend',
      demo: 'https://github.com/Sardor-M/tunnel_chat/tree/main/tunnel_chat_frontend',
    },
    {
      title: t('projects.sample.title'),
      description: t('projects.sample.description'),
      tags: ['framer-motion', 'mapbox-gl', 'react-js', 'socket-io'],
      github: 'https://github.com/Sardor-M/run_with_us/tree/main/frontend',
      demo: 'https://github.com/Sardor-M/run_with_us/tree/main/frontend',
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
              <TitleRow>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectLinks>
                  <LinkWrapper
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on GitHub"
                  >
                    <GithubRepoIcon />
                  </LinkWrapper>
                  <LinkWrapper
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Demo"
                  >
                    <StyledExternalLink />
                  </LinkWrapper>
                </ProjectLinks>
              </TitleRow>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TagList>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
            </ProjectCard>
          ))}
        </ProjectCards>
      </Section>
    </PortfolioContainer>
  );
}
