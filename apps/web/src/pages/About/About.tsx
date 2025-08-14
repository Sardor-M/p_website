import { themeColor } from '@/themes/color';
import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { ClockCircleOutlined, CodeOutlined, GithubOutlined } from '@ant-design/icons';
import { FaRunning } from 'react-icons/fa';
import { useAboutAnimation } from '@/hooks/useAnimations/useAboutAnimation';

const AboutMeContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const ContentWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
`;

const FullHeightSection = styled.section<{ isDarkMode: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8px;
    padding-top: 10px;
    transform: translateY(20px);
    opacity: 0;
    transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const SecondSection = styled(FullHeightSection)`
    border-radius: 10px;
    padding-top: 10px;
    margin-top: 20px;
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const StatsContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0;
`;

const IntroSubtitle = styled.p<{ isDarkMode: boolean }>`
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 12px;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')};

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8rem;
        margin-bottom: 10px;
        line-height: 1.5;
    }
`;

const IntroTitle = styled.h1<{ isDarkMode: boolean }>`
    font-size: 4.5rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 10px;
    }
`;

const IntroDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1.3rem;
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto 20px;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)')};

    ${themeColor.breakpoints.mobile} {
        font-size: 1.1rem;
    }
`;

const SkillTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;

    ${themeColor.breakpoints.mobile} {
        gap: 6px;
        margin-bottom: 15px;
    }
`;

const SkillTag = styled.span<{ isDarkMode: boolean }>`
    padding: 5px 12px;
    border-radius: 14px;
    font-size: 0.8rem;
    background: ${(props) =>
        props.isDarkMode
            ? 'linear-gradient(135deg, #4078f233, #4078f21a)'
            : 'linear-gradient(135deg, #4078f21a, #ebebebcc)'};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    transition: all 0.3s ease;
    border: 1px solid ${(props) => (props.isDarkMode ? '#ffffff1a' : '#0000000d')};
    box-shadow: 0 2px 5px ${(props) => (props.isDarkMode ? '#00000033' : '#0000000d')};
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px ${(props) => (props.isDarkMode ? '#0000004d' : '#0000001a')};
        background: ${(props) =>
            props.isDarkMode
                ? 'linear-gradient(135deg, #4078f24d, #4078f226)'
                : 'linear-gradient(135deg, #4078f226, #ebebebe6)'};
    }
    ${themeColor.breakpoints.mobile} {
        font-size: 0.65rem;
        padding: 4px 8px;
        margin: 1px;
        border-radius: 8px;
        max-width: 90px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const StatsCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 100%;
    margin: 0 auto;

    ${themeColor.breakpoints.tablet} {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    ${themeColor.breakpoints.mobile} {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

const StatsCard = styled.div<{ isDarkMode: boolean; accentColor?: string }>`
    padding: 16px;
    border-radius: 10px;
    border: 1px solid
        ${(props) => (props.isDarkMode ? themeColor.border.dark : themeColor.border.light)};
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    margin: 0 auto;
    text-align: left;
    width: 100%;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: ${(props) =>
            props.accentColor || (props.isDarkMode ? '#4078f2' : '#4078f2')};
    }

    ${themeColor.breakpoints.mobile} {
        max-width: 100%;
        min-height: 100px;
        padding: 14px;
    }
`;

const StatTitle = styled.h4<{ isDarkMode: boolean }>`
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 1px;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)')};
    display: block;
`;

const StatValueLarge = styled.div<{ isDarkMode: boolean }>`
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};

    ${themeColor.breakpoints.mobile} {
        font-size: 1.8rem;
    }
`;

const StatDescription = styled.p<{ isDarkMode: boolean }>`
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.8rem;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')};
    margin-top: auto;
    line-height: 1.4;

    ${themeColor.breakpoints.mobile} {
        font-size: 0.75rem;
        line-height: 1.3;
        -webkit-line-clamp: 3;
    }
`;

export default function AboutMe({ isDarkMode }: DarkModeProps) {
    const { sectionHeadingRef, pageTitleRef, aboutTextRef, skillsRef, statisticsRef } =
        useAboutAnimation(isDarkMode);

    return (
        <AboutMeContainer isDarkMode={isDarkMode}>
            <ContentWrapper>
                <FullHeightSection
                    ref={sectionHeadingRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '0ms' }}
                >
                    <IntroSubtitle isDarkMode={isDarkMode}>
                        PUSHING THE BOUNDARIES OF DIGITAL EXPERIENCES
                    </IntroSubtitle>
                </FullHeightSection>

                <FullHeightSection
                    ref={pageTitleRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '200ms' }}
                >
                    <IntroTitle isDarkMode={isDarkMode}>Hey, I'm Sardor</IntroTitle>
                </FullHeightSection>

                <FullHeightSection
                    ref={aboutTextRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '300ms' }}
                >
                    <IntroDescription isDarkMode={isDarkMode}>
                        I love to build impactful full-stack projects with modern technologies and
                        high-performance.
                    </IntroDescription>
                </FullHeightSection>

                <FullHeightSection
                    ref={skillsRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '400ms' }}
                >
                    <SkillTagsContainer>
                        <SkillTag isDarkMode={isDarkMode}>React</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>TypeScript</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>Javascript</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>Nodejs</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>PostgreSQL</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>MySQL</SkillTag>
                        <SkillTag isDarkMode={isDarkMode}>Styled-Components</SkillTag>
                    </SkillTagsContainer>
                </FullHeightSection>

                <SecondSection
                    ref={statisticsRef}
                    isDarkMode={isDarkMode}
                    style={{ transitionDelay: '500ms' }}
                >
                    <StatsContainer>
                        <StatsCardGrid>
                            <StatsCard
                                isDarkMode={isDarkMode}
                                accentColor="#00c853"
                                style={{ transitionDelay: '600ms' }}
                                className="visible"
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '6px',
                                        color: '#4078f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <CodeOutlined style={{ width: '15px', height: '15px' }} />
                                    <StatTitle isDarkMode={isDarkMode}>Projects</StatTitle>
                                </div>
                                <StatValueLarge isDarkMode={isDarkMode}>6+</StatValueLarge>
                                <StatDescription isDarkMode={isDarkMode}>
                                    Full-stack and Front-end web applications
                                </StatDescription>
                            </StatsCard>

                            <StatsCard
                                isDarkMode={isDarkMode}
                                accentColor="#FFB300"
                                style={{ transitionDelay: '800ms' }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '6px',
                                        color: '#4078f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ width: '15px', height: '15px' }}
                                    />
                                    <StatTitle isDarkMode={isDarkMode}>Code Hours</StatTitle>
                                </div>
                                <StatValueLarge isDarkMode={isDarkMode}>2500+</StatValueLarge>
                                <StatDescription isDarkMode={isDarkMode}>
                                    Hours of programming experience
                                </StatDescription>
                            </StatsCard>

                            <StatsCard
                                isDarkMode={isDarkMode}
                                accentColor="#FF6B6B"
                                style={{ transitionDelay: '1000ms' }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '6px',
                                        color: '#4078f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <GithubOutlined style={{ width: '15px', height: '15px' }} />
                                    <StatTitle isDarkMode={isDarkMode}>GitHub</StatTitle>
                                </div>
                                <StatValueLarge isDarkMode={isDarkMode}>750+</StatValueLarge>
                                <StatDescription isDarkMode={isDarkMode}>
                                    Commits and contributions to personal projects
                                </StatDescription>
                            </StatsCard>

                            <StatsCard
                                isDarkMode={isDarkMode}
                                accentColor="#4078f2"
                                style={{ transitionDelay: '1100ms' }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '6px',
                                        color: '#4078f2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <FaRunning style={{ width: '15px', height: '15px' }} />
                                    <StatTitle isDarkMode={isDarkMode}>Run / Cycling</StatTitle>
                                </div>
                                <StatValueLarge isDarkMode={isDarkMode}>1875km</StatValueLarge>
                                <StatDescription isDarkMode={isDarkMode}>
                                    Total distance run / cycled until now
                                </StatDescription>
                            </StatsCard>
                        </StatsCardGrid>
                    </StatsContainer>
                </SecondSection>
            </ContentWrapper>
        </AboutMeContainer>
    );
}
