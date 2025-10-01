import { themeColor } from '@/themes/color';
import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { useAboutAnimation } from '@/hooks/useAnimations/useAboutAnimation';

const AboutMeContainer = styled.div<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    display: flex;
    align-items: flex-start;
    padding-bottom: 30px;
    border-bottom: 1px solid ${(props) => (props.isDarkMode ? '#333' : '#e5e5e5')};
    font-family:
        'DepartureMono-Regular', 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
`;

const ContentWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: inherit;
`;

const FullHeightSection = styled.section<{ isDarkMode: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    transform: translateY(20px);
    opacity: 0;
    transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
    max-width: 800px;
    margin: 0 auto;
    margin-left: 0;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
    font-family: inherit;
`;

const IntroGreeting = styled.h1<{ isDarkMode: boolean }>`
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    font-family: inherit;
    letter-spacing: -1px;

    ${themeColor.breakpoints.mobile} {
        font-size: 2.2rem;
    }
`;

const IntroDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 0;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)')};
    max-width: 650px;
    font-family: inherit;

    ${themeColor.breakpoints.mobile} {
        font-size: 1rem;
    }
`;

const NavigationLinks = styled.div<{ isDarkMode: boolean }>`
    display: flex;
    gap: 32px;
    margin-top: 20px;
    align-items: center;
    flex-wrap: wrap;
    font-family: inherit;

    ${themeColor.breakpoints.mobile} {
        gap: 24px;
        margin-top: 15px;
    }
`;

const NavLink = styled.a<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-family: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#161616ff')};
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;

    &:hover {
        color: ${(props) => (props.isDarkMode ? '#E5E7EB' : '#374151')};
        transform: translateX(4px);
    }

    svg {
        width: 16px;
        height: 16px;
        color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#161616ff')};
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.8rem;
    }
`;

export default function AboutMe({ isDarkMode }: DarkModeProps) {
    const { sectionHeadingRef } = useAboutAnimation(isDarkMode);

    const displayName = import.meta.env.VITE_DISPLAY_NAME || 'DEV';

    return (
        <AboutMeContainer isDarkMode={isDarkMode}>
            <ContentWrapper>
                <FullHeightSection ref={sectionHeadingRef} isDarkMode={isDarkMode}>
                    <IntroGreeting isDarkMode={isDarkMode}>{displayName} 👋</IntroGreeting>
                    <IntroDescription isDarkMode={isDarkMode}>
                        Web, systems enthusiast and curious learner.
                    </IntroDescription>

                    <NavigationLinks isDarkMode={isDarkMode}>
                        <NavLink href="#projects" isDarkMode={isDarkMode}>
                            ~/project
                        </NavLink>
                        <NavLink href="#contact" isDarkMode={isDarkMode}>
                            ~/contact
                        </NavLink>
                        <NavLink href="/" isDarkMode={isDarkMode}>
                            ~/blog
                        </NavLink>
                    </NavigationLinks>
                </FullHeightSection>
            </ContentWrapper>
        </AboutMeContainer>
    );
}
