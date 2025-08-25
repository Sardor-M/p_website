import styled from 'styled-components';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import projectsData from '@/pages/Portfolio/data/projectData';
import { useProjectCardAnimation } from '@/hooks/useAnimations/useProjectAnimation';

const ProjectsContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const SectionWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SectionHeading = styled.h2<{ isDarkMode: boolean }>`
    font-size: 1rem;
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

const PageTitle = styled.h1<{ isDarkMode: boolean }>`
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 25px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s ease;
    transition-delay: 0.2s;
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    align-self: left;

    &.visible {
        transform: translateY(0);
        opacity: 1;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 2.3rem;
        margin-bottom: 20px;
    }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 80px;

    ${themeColor.breakpoints.mobile} {
        gap: 60px;
    }
`;

const ProjectCard = styled.div<{ isDarkMode: boolean }>`
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const ProjectWindow = styled.div<{ isDarkMode: boolean }>`
    border-radius: 8px;
    overflow: hidden;
    border: 0.4px solid
        ${(props) => (props.isDarkMode ? themeColor.background.dark : themeColor.border.light)};
    transition: all 0.3s ease;
    margin-bottom: 25px;
    background-color: #e8e8e8;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px
            ${(props) => (props.isDarkMode ? themeColor.shadow.dark : themeColor.shadow.light)};
    }
`;

const BrowserBar = styled.div<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode
            ? themeColor.codeContent.codeHeaderDark
            : themeColor.codeContent.codeHeaderLight};
    padding: 10px 15px;
    display: flex;
    align-items: center;
`;

const WindowControls = styled.div`
    display: flex;
    gap: 6px;
`;

const WindowButton = styled.div<{ color: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProjectContent = styled.div<{ theme: string }>`
    padding: 0;
    width: 100%;
    background: ${(props) => (props.theme === 'dark' ? '#1E1E1E' : '#FFFFFF')};
    overflow: hidden;
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    display: block;
`;

const ProjectInfo = styled.div<{ isDarkMode: boolean }>`
    padding: 24px 30px;
    background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#F9F9F9')};
    border-top: 1px solid
        ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};

    @media (max-width: 768px) {
        padding: 15px 20px;
    }
`;

const ProjectCategory = styled.h4<{ isDarkMode: boolean }>`
    font-size: 1rem;
    margin-bottom: 15px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 0.7;
        transform: translateY(0);
    }
`;

const ProjectTitle = styled.h3<{ isDarkMode: boolean }>`
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 1.5rem;
    }
`;

const ProjectDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 1rem;
    }
`;

const ProjectStats = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin: 20px 0;
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    ${themeColor.breakpoints.mobile} {
        gap: 20px;
    }
`;

const ProjectStat = styled.div<{ isDarkMode: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    border-radius: 8px;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.hover.dark : themeColor.backgroundSpan.light};
    padding: 15px;

    flex: 1;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 25px;
    opacity: 0;
    transform: translateY(20px);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const StatLabel = styled.div<{ isDarkMode: boolean }>`
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    opacity: 0.7;
`;

const StatValue = styled.div<{ isDarkMode: boolean }>`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const TechTag = styled.span<{ isDarkMode: boolean }>`
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 0.8rem;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.hover.dark : themeColor.hover.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) =>
            props.isDarkMode ? themeColor.activeHover.dark : themeColor.activeHover.light};
    }
`;

const ProjectLink = styled.a<{ isDarkMode: boolean; isUrlLink: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.hover.dark : themeColor.backgroundSpan.light};
    padding: 10px 15px;
    border-radius: 10px;

    &:hover {
        opacity: 0.9;
        color: ${(props) => (props.isUrlLink ? '#00C851' : '#2D88FF')};
        font-weight: 700;
        transform: translateY(-2px);
    }
`;

export default function Projects({ isDarkMode }: DarkModeProps) {
    const { sectionHeadingRef, pageTitleRef, projectRefs } = useProjectCardAnimation(
        isDarkMode,
        projectsData.length
    );

    return (
        <ProjectsContainer isDarkMode={isDarkMode}>
            <SectionWrapper>
                <SectionHeading
                    ref={sectionHeadingRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '0ms' }}
                >
                    FEATURED PROJECTS
                </SectionHeading>
                <PageTitle
                    ref={pageTitleRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '200ms' }}
                >
                    What I've Built
                </PageTitle>

                <ProjectsGrid>
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            ref={projectRefs[index].cardRef}
                            isDarkMode={isDarkMode}
                            style={{ transitionDelay: `${400 + index * 200}ms` }}
                        >
                            <ProjectWindow isDarkMode={isDarkMode}>
                                <BrowserBar isDarkMode={isDarkMode}>
                                    <WindowControls>
                                        <WindowButton color="#FF5F56" />
                                        <WindowButton color="#FFBD2E" />
                                        <WindowButton color="#27C93F" />
                                    </WindowControls>
                                </BrowserBar>
                                <ProjectContent theme={isDarkMode ? 'dark' : 'light'}>
                                    <ProjectImage src={project.image} alt={project.title} />
                                </ProjectContent>

                                <ProjectInfo isDarkMode={isDarkMode}>
                                    <ProjectCategory
                                        ref={projectRefs[index].categoryRef}
                                        isDarkMode={isDarkMode}
                                        style={{ transitionDelay: `${500 + index * 200}ms` }}
                                    >
                                        {project.category}
                                    </ProjectCategory>
                                    <ProjectTitle
                                        ref={projectRefs[index].titleRef}
                                        isDarkMode={isDarkMode}
                                        style={{ transitionDelay: `${600 + index * 200}ms` }}
                                    >
                                        {project.title}
                                    </ProjectTitle>
                                    <ProjectDescription
                                        ref={projectRefs[index].descriptionRef}
                                        isDarkMode={isDarkMode}
                                        style={{ transitionDelay: `${700 + index * 200}ms` }}
                                    >
                                        {project.description}
                                    </ProjectDescription>

                                    <ProjectStats
                                        ref={projectRefs[index].statsRef}
                                        style={{ transitionDelay: `${800 + index * 200}ms` }}
                                    >
                                        <ProjectStat isDarkMode={isDarkMode}>
                                            <StatLabel isDarkMode={isDarkMode}>
                                                Users/Partners
                                            </StatLabel>
                                            <StatValue isDarkMode={isDarkMode}>
                                                {project.audience}
                                            </StatValue>
                                        </ProjectStat>
                                        <ProjectStat isDarkMode={isDarkMode}>
                                            <StatLabel isDarkMode={isDarkMode}>Impact</StatLabel>
                                            <StatValue isDarkMode={isDarkMode}>
                                                {project.impact}
                                            </StatValue>
                                        </ProjectStat>
                                    </ProjectStats>

                                    <TechStack
                                        ref={projectRefs[index].techStackRef}
                                        style={{ transitionDelay: `${900 + index * 200}ms` }}
                                    >
                                        {project.techStack.map((tech, techIndex) => (
                                            <TechTag key={techIndex} isDarkMode={isDarkMode}>
                                                {tech}
                                            </TechTag>
                                        ))}
                                    </TechStack>

                                    <ProjectLinks
                                        ref={projectRefs[index].linksRef}
                                        style={{ transitionDelay: `${1000 + index * 200}ms` }}
                                    >
                                        <ProjectLink
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            isDarkMode={isDarkMode}
                                            isUrlLink={false}
                                        >
                                            <GithubOutlined style={{ fontSize: '20px' }} />
                                            GitHub
                                        </ProjectLink>
                                        <ProjectLink
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            isDarkMode={isDarkMode}
                                            isUrlLink={true}
                                        >
                                            <LinkOutlined style={{ fontSize: '20px' }} />
                                            Live
                                        </ProjectLink>
                                    </ProjectLinks>
                                </ProjectInfo>
                            </ProjectWindow>
                        </ProjectCard>
                    ))}
                </ProjectsGrid>
            </SectionWrapper>
        </ProjectsContainer>
    );
}
