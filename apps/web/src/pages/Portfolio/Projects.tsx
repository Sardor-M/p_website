import styled from 'styled-components';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { ProjectProps, projectsData } from '@/pages/Portfolio/data/projectData';
import { useProjectCardAnimation } from '@/hooks/useAnimations/useProjectAnimation';
import { useState } from 'react';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';


const ProjectsContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    font-family:
        'DepartureMono-Regular', 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
    font-size: 1rem;
    padding-top: 30px;
`;

const SearchBar = styled.div<{ isDarkMode: boolean }>`
    width: 100%;
    margin-bottom: 30px;
    position: relative;
`;

const SearchInput = styled.input<{ isDarkMode: boolean }>`
    width: 100%;
    padding: 14px 18px;
    border-radius: 8px;
    border: 1px solid ${(props) => (props.isDarkMode ? '#444' : '#ccc')};
    background-color: ${(props) => (props.isDarkMode ? '#1a1a1a' : '#fff')};
    color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
    font-size: 0.95rem;
    font-family: inherit;

    &::placeholder {
        color: ${(props) => (props.isDarkMode ? '#666' : '#999')};
    }

    &:focus {
        outline: none;
        border-color: ${(props) => (props.isDarkMode ? '#666' : '#999')};
    }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    width: 100%;

    ${themeColor.breakpoints.tablet} {
        grid-template-columns: 1fr;
    }

    ${themeColor.breakpoints.mobile} {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const ProjectWindow = styled.div<{ isDarkMode: boolean }>`
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${(props) => (props.isDarkMode ? '#444' : '#e5e5e5')};
    transition: all 0.3s ease;
    background-color: ${(props) => (props.isDarkMode ? '#1a1a1a' : '#fff')};
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px
            ${(props) => (props.isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)')};
    }

    ${themeColor.breakpoints.mobile} {
        height: auto;
    }
`;

const ProjectInfo = styled.div<{ isDarkMode: boolean }>`
    padding: 20px;
    background-color: transparent;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

    ${themeColor.breakpoints.mobile} {
        padding: 16px;
        gap: 6px;
    }
`;

const ProjectHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2px;
`;

const ProjectMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CodeIcon = styled.span<{ isDarkMode: boolean }>`
    color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
    font-size: 1rem;
`;

const TechTag = styled.span<{ isDarkMode: boolean }>`
    padding: 4px 9px;
    border-radius: 6px;
    font-size: 0.66rem;
    background-color: transparent;
    color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
    transition: all 0.3s ease;
    border: 0.8px solid ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
    font-weight: 500;

    &:hover {
        background-color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
        color: #000;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 3px 8px;
        font-size: 0.65rem;
    }
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 14px;

    ${themeColor.breakpoints.mobile} {
        gap: 12px;
    }
`;

const ProjectLink = styled.a<{ isDarkMode: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
    text-decoration: underline;
    font-size: 0.8rem;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
        color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
    }

    svg {
        font-size: 16px;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.75rem;
        gap: 4px;

        svg {
            font-size: 12px;
        }
    }
`;

const ProjectDate = styled.div<{ isDarkMode: boolean }>`
    font-size: 0.7rem;
    color: ${(props) => (props.isDarkMode ? '#888' : '#666')};
    display: flex;
    align-items: center;
    gap: 6px;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.65rem;
        gap: 5px;
    }
`;

const LanguageDot = styled.span<{ isDarkMode: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
`;

const SectionWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: inherit;
`;

const SectionHeading = styled.h2<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 20px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s ease;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-self: left;

    &.visible {
        transform: translateY(0);
        opacity: 0.7;
    }

    ${themeColor.breakpoints.mobile} {
        display: flex;
        flex-direction: row;
        gap: 10px;
        width: 100%;
        font-size: 0.8rem;
        align-self: left;
        justify-self: left;
    }
`;

const ProjectCard = styled.div<{ isDarkMode: boolean }>`
    opacity: 1;
    transform: translateY(0);
`;

const ProjectCategory = styled.h4<{ isDarkMode: boolean }>`
    font-size: 0.65rem;
    margin: 0;
    color: ${(props) => (props.isDarkMode ? '#888' : '#666')};
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.6rem;
    }
`;

const ProjectTitle = styled.h3<{ isDarkMode: boolean }>`
    font-size: 1.4rem;
    margin: 6px 0;
    color: ${(props) => (props.isDarkMode ? '#E8A87C' : '#D97706')};
    font-weight: 700;
    line-height: 1.2;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.15rem;
        margin: 4px 0;
    }
`;

const ProjectDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 12px;
    color: ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)')};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.75rem;
        margin-bottom: 8px;
        line-height: 1.4;
    }
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;

    ${themeColor.breakpoints.mobile} {
        gap: 5px;
        margin-bottom: 10px;
    }
`;

const ProjectFooter = styled.div<{ isDarkMode: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid ${(props) => (props.isDarkMode ? '#333' : '#e5e5e5')};

    ${themeColor.breakpoints.mobile} {
        padding-top: 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
`;

const StatusBadge = styled.span<{ isDarkMode: boolean }>`
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 600;
    background-color: transparent;
    color: #2ed573;
    border: 1px solid rgba(46, 213, 115, 0.5);
    text-transform: lowercase;

    ${themeColor.breakpoints.mobile} {
        padding: 2px 6px;
        font-size: 0.6rem;
    }
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    grid-column: 1 / -1;
`;

const EmptyStateText = styled.p<{ isDarkMode: boolean }>`
    font-size: 1rem;
    color: ${(props) => (props.isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)')};
    margin: 0;
`;

export default function Projects({ isDarkMode }: DarkModeProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const { sectionHeadingRef } = useProjectCardAnimation(isDarkMode, projectsData.length);

    const filteredProjects = projectsData.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ProjectsContainer isDarkMode={isDarkMode}>
            <SectionWrapper>
                <SectionHeading
                    ref={sectionHeadingRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '0ms' }}
                >
                    ~/projects → ls -la --sort
                </SectionHeading>

                <SearchBar isDarkMode={isDarkMode}>
                    <SearchInput
                        type="text"
                        placeholder="$ grep -i 'search projects...'"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        isDarkMode={isDarkMode}
                    />
                </SearchBar>

                <ProjectsGrid>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project: ProjectProps) => (
                            <ProjectCard key={project.id} isDarkMode={isDarkMode}>
                                <ProjectWindow isDarkMode={isDarkMode}>
                                    <ProjectInfo isDarkMode={isDarkMode}>
                                        <ProjectHeader>
                                            <ProjectMeta>
                                                <CodeIcon isDarkMode={isDarkMode}>
                                                    &lt;&gt;
                                                </CodeIcon>
                                            </ProjectMeta>
                                            <StatusBadge isDarkMode={isDarkMode}>
                                                active
                                            </StatusBadge>
                                        </ProjectHeader>

                                        <ProjectCategory isDarkMode={isDarkMode}>
                                            {project.category}
                                        </ProjectCategory>

                                        <ProjectTitle isDarkMode={isDarkMode}>
                                            {project.title}
                                        </ProjectTitle>

                                        <ProjectDescription isDarkMode={isDarkMode}>
                                            {project.description}
                                        </ProjectDescription>

                                        <TechStack>
                                            {project.techStack
                                                .slice(0, 3)
                                                .map((tech: string, techIndex: number) => (
                                                    <TechTag
                                                        key={techIndex}
                                                        isDarkMode={isDarkMode}
                                                    >
                                                        {tech}
                                                    </TechTag>
                                                ))}
                                        </TechStack>

                                        <ProjectFooter isDarkMode={isDarkMode}>
                                            <ProjectLinks>
                                                <ProjectLink
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    isDarkMode={isDarkMode}
                                                >
                                                    <GithubOutlined />
                                                </ProjectLink>
                                                <ProjectLink
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    isDarkMode={isDarkMode}
                                                >
                                                    <LinkOutlined />
                                                </ProjectLink>
                                            </ProjectLinks>

                                            <ProjectDate isDarkMode={isDarkMode}>
                                                Updated: {project.lastUpdated || '9/28/2025'} |
                                                <LanguageDot isDarkMode={isDarkMode} />
                                                {project.language || 'TypeScript'}
                                            </ProjectDate>
                                        </ProjectFooter>
                                    </ProjectInfo>
                                </ProjectWindow>
                            </ProjectCard>
                        ))
                    ) : (
                        <EmptyState>
                            <EmptyStateText isDarkMode={isDarkMode}>
                                No projects found matching "{searchQuery}"
                            </EmptyStateText>
                        </EmptyState>
                    )}
                </ProjectsGrid>
            </SectionWrapper>
        </ProjectsContainer>
    );
}
