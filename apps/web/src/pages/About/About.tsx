import { themeColor } from '@/themes/color';
import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { useAboutAnimation } from '@/hooks/useAnimations/useAboutAnimation';

const AboutMeContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    min-height: 40vh;
    display: flex;
    align-items: flex-start;
    padding-bottom: 10px;
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

const PreAscii = styled.pre<{ isDarkMode: boolean }>`
    font-family: inherit;
    font-size: 0.86rem;
    line-height: 1.1;
    color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#374151')};
    text-align: left;
    white-space: pre;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
    opacity: 90px;
    user-select: none;

    ${themeColor.breakpoints.tablet} {
        font-size: 0.84rem;
        margin-bottom: 16px;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: 0.7rem;
        margin-bottom: 24px;
        line-height: 1.2;
        letter-spacing: -1px;
    }
`;

const IntroGreeting = styled.h1<{ isDarkMode: boolean }>`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    font-family: inherit;
`;

const IntroDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)')};
    max-width: 600px;
    font-family: inherit;
`;

const NavigationLinks = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 24px;
    align-items: center;
    flex-wrap: wrap;
    font-family: inherit;
`;

const NavLink = styled.a<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-family: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#161616ff')};
    font-weight: 550;
    background: none;
    border: none;
    padding: 0;

    &:hover {
        color: ${(props) => (props.isDarkMode ? '#E5E7EB' : '#374151')};
    }

    svg {
        width: 14px;
        height: 14px;
        color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#161616ff')};
    }
`;

export default function AboutMe({ isDarkMode }: DarkModeProps) {
    const { sectionHeadingRef } = useAboutAnimation(isDarkMode);

    const displayName = import.meta.env.VITE_DISPLAY_NAME || 'DEV';

    const asciiNames: Record<string, string> = {
        DEV: `
██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██║   ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝
██████╔╝███████╗ ╚████╔╝ 
╚═════╝ ╚══════╝  ╚═══╝`,
        SARDOR: `
███████╗ █████╗ ██████╗ ██████╗  ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
███████╗███████║██████╔╝██║  ██║██║   ██║██████╔╝
╚════██║██╔══██║██╔══██╗██║  ██║██║   ██║██╔══██╗       
███████║██║  ██║██║  ██║██████╔╝╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝`,
    };

    return (
        <AboutMeContainer isDarkMode={isDarkMode}>
            <ContentWrapper>
                <FullHeightSection ref={sectionHeadingRef} isDarkMode={isDarkMode}>
                    <PreAscii isDarkMode={isDarkMode}>
                        {asciiNames[displayName] || asciiNames['DEV']}
                    </PreAscii>
                    <IntroGreeting isDarkMode={isDarkMode}>Hello, World! 👋</IntroGreeting>
                    <IntroDescription isDarkMode={isDarkMode}>
                        Web, systems enthusiast and curious learner.
                    </IntroDescription>

                    <NavigationLinks>
                        <NavLink href="#about" isDarkMode={isDarkMode}>
                            ~/about
                        </NavLink>
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
