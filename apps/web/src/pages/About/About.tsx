import { themeColor } from '@/themes/color';
import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { useAboutAnimation } from '@/hooks/useAnimations/useAboutAnimation';
import { ChevronsLeftRight, Contact2, Newspaper, UserRound } from 'lucide-react';

const AboutMeContainer = styled.section<{ isDarkMode: boolean }>`
    background-color: ${(props) =>
        props.isDarkMode ? themeColor.background.dark : themeColor.background.light};
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
    min-height: 40vh;
    display: flex;
    align-items: flex-start;
    padding-bottom: 10px;
`;

const ContentWrapper = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;

const PreAscii = styled.pre<{ isDarkMode: boolean }>`
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.5rem;
    line-height: 1;
    color: ${(props) => (props.isDarkMode ? '#9CA3AF' : '#374151')};
    text-align: left;
    white-space: pre;
    margin-bottom: 20px;
    letter-spacing: -1px;

    @media (min-width: 768px) {
        font-size: 0.7rem;
        margin-bottom: 24px;
    }

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

const IntroGreeting = styled.h1<{ isDarkMode: boolean }>`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: ${(props) => (props.isDarkMode ? themeColor.text.dark : themeColor.text.light)};
`;

const IntroDescription = styled.p<{ isDarkMode: boolean }>`
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0;
    color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)')};
    max-width: 600px;
`;

const NavigationLinks = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 24px;
    align-items: center;
    flex-wrap: wrap;
`;

const NavLink = styled.a<{ isDarkMode: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
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
                            <UserRound size={14} strokeWidth={2} />
                            ~/about
                        </NavLink>
                        <NavLink href="#projects" isDarkMode={isDarkMode}>
                            <ChevronsLeftRight size={14} strokeWidth={2} />
                            ~/projects
                        </NavLink>
                        <NavLink href="#contact" isDarkMode={isDarkMode}>
                            <Contact2 size={14} strokeWidth={2} />
                            ~/contact
                        </NavLink>
                        <NavLink href="/" isDarkMode={isDarkMode}>
                            <Newspaper size={14} strokeWidth={2} />
                            ~/blog
                        </NavLink>
                    </NavigationLinks>
                </FullHeightSection>
            </ContentWrapper>
        </AboutMeContainer>
    );
}
