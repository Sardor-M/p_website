import { ReactNode, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import StyledCard from '@/components/Card/StyledCard';
import { GithubFilled, LinkedinFilled, MailFilled } from '@ant-design/icons';
import { getHoverStyles, getThemeStyles } from '@/themes';
import { useFilter } from '@/context/FilterContext';
import { useLocation } from 'react-router-dom';
import { CONFIG } from '@/config/site.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { themeColor } from '@/themes/color';

type LayoutProps = {
    children: ReactNode;
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
};

const TAG_LIST = [
    'JavaScript',
    'Frontend',
    'PostgreSQL',
    'TypeScript',
    'Database',
    'React',
    'Next.js',
];

const MaxWidthContainer = styled.div`
    width: 100%;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const LayoutContainer = styled.div`
    ${({ theme }) => getThemeStyles(theme, ['background', 'text'])};
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow: visible;
    position: relative;

    ${themeColor.breakpoints.mobile} {
        max-height: none;
        min-height: 100vh;
        height: auto;
        overflow-y: visible;
        overflow-x: hidden;
        padding-bottom: 0;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    flex: 1;
    padding: 80px 70px 10px;
    // min-height: calc(100vh - 60px);
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;

    ${themeColor.breakpoints.tablet} {
        gap: 1rem;
        padding: 70px 15px 15px;
    }

    ${themeColor.breakpoints.mobile} {
        flex-direction: column;
        gap: 0;
        padding: 70px 10px 60px 10px;
        min-height: auto;
    }
`;

const MainContent = styled.main<{ isPortfolioPage: boolean }>`
    flex: 1;
    padding: ${(props) => (props.isPortfolioPage ? '40px 20px' : '0')};
    overflow-y: ${(props) => (props.isPortfolioPage ? 'auto' : 'visible')};
    overflow-x: hidden;
    min-width: 0;
    max-width: ${(props) => (props.isPortfolioPage ? '900px' : '800px')};
    margin: 0 auto;
    box-sizing: border-box;

    ${(props) =>
        props.isPortfolioPage &&
        `
        height: calc(100vh - 160px);
        max-height: calc(100vh - 160px);
    `}

    &::-webkit-scrollbar {
        width: 0.1px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#ccc')};
        border-radius: 0.1px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: ${(props) => (props.isPortfolioPage ? '10px' : '0 10px')};
        width: 100%;
        max-height: none;
        max-width: 100%;
        overflow-y: visible;
        height: auto;
        flex-shrink: 0;
    }
`;

const LeftSidebar = styled.aside`
    width: 250px;
    padding: 1.5rem 1rem;
    flex-shrink: 0;
    height: fit-content;

    ${themeColor.breakpoints.tablet} {
        width: 200px;
        padding: 1.25rem 0.75rem;
    }

    ${themeColor.breakpoints.mobile} {
        width: 100%;
        padding: 1rem;
        background: transparent;
        border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};
        border-radius: 0;
    }
`;

const RightSidebar = styled.aside`
    width: 300px;
    padding: 1.5rem 1rem;
    flex-shrink: 0;
    height: fit-content;

    ${themeColor.breakpoints.tablet} {
        width: 250px;
        padding: 1.25rem 0.75rem;
    }

    ${themeColor.breakpoints.mobile} {
        width: 100%;
        padding: 0 10px;
        background: transparent;
        padding-top: 1.5rem;
        border-top: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : '#e5e5e5')};
        border-radius: 0;
        margin-top: 1.5rem;
    }
`;

const TagSection = styled.section`
    margin: 0;
    padding: 0;
    height: 100%;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
        margin: 0;
    }
`;

const TagTitle = styled.h2`
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 600;
    padding: 0.4rem 0.75rem;
`;

const TagList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TagItem = styled.li`
    padding: 0.6rem 0.8rem;
    border-radius: 14px;
    font-size: 0.85rem;
    margin: 0.4rem 0;
    transition: all 0.2s ease;

    &:hover {
        ${({ theme }) => getHoverStyles(theme)};
        transform: translateX(4px);
    }

    &.active {
        ${({ theme }) => getHoverStyles(theme)};
        font-weight: 500;
    }
`;

const ProfileSection = styled.section`
    text-align: center;
    margin: 0;
    width: 100%;

    ${themeColor.breakpoints.mobile} {
        max-width: 100%;
        margin-top: 0;
    }
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 5%;
    object-fit: cover;
    padding: 0;
`;

const ProfileName = styled.h2`
    font-size: 1rem;
    margin: 8px 8px;
`;

const ProfileBio = styled.p`
    color: rgb(165, 165, 165);
    margin: 10px 20px;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 0.5rem;
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

const ContactTitle = styled.h2`
    font-size: 1.1rem;
    margin-top: 40px;
    margin-bottom: 20px;
    ${({ theme }) => getThemeStyles(theme, 'text')};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
        color: #6b7280;
    }
`;

const ContactList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ContactItem = styled.li`
    font-size: 14px;
    padding: 0.7rem;
    transition: all 0.2s;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    ${({ theme }) => getThemeStyles(theme, 'text')};

    &:hover {
        ${({ theme }) => getThemeStyles(theme, 'hover')};
    }

    svg {
        width: 14px;
        height: 14px;
    }
`;

const ContactItemLink = styled.a`
    text-decoration: none;
    color: inherit;
`;

const dropDown = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
`;

const AnimatedSection = styled.div<{ delay?: number }>`
    animation: ${dropDown} 0.6s ease-out forwards;
    animation-delay: ${(props) => props.delay || 0}s;
    opacity: 0;
`;

export default function Layout({ children, onToggleTheme, theme }: LayoutProps) {
    const { selectedTag, setSelectedTag, setSelectedGroup } = useFilter();
    const location = useLocation();
    const isBlogDetailsPage = location.pathname.startsWith('/blog/');
    const shouldShowHeader = !isBlogDetailsPage;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    const handleTagsClick = (tag: string) => {
        setSelectedTag(tag === selectedTag ? '' : tag);
        setSelectedGroup('All');
    };

    return (
        <LayoutContainer>
            {shouldShowHeader && <Header onToggleTheme={onToggleTheme} theme={theme} />}
            <MaxWidthContainer>
                <ContentWrapper style={{ paddingTop: shouldShowHeader ? '80px' : '20px' }}>
                    {['/about', '/projects', '/resume', '/contact'].includes(location.pathname) ? (
                        <MainContent isPortfolioPage={true}>
                            <AnimatedSection delay={0.3}>{children}</AnimatedSection>
                        </MainContent>
                    ) : (
                        <>
                            {shouldShowHeader && !isMobile && (
                                <LeftSidebar>
                                    <AnimatedSection delay={0.3}>
                                        <TagSection>
                                            <TagTitle>📌 Tags</TagTitle>
                                            <TagList>
                                                {TAG_LIST.map((tag) => (
                                                    <TagItem
                                                        key={tag}
                                                        onClick={() => handleTagsClick(tag)}
                                                        className={
                                                            tag === selectedTag ? 'active' : ''
                                                        }
                                                    >
                                                        {tag}
                                                    </TagItem>
                                                ))}
                                            </TagList>
                                        </TagSection>
                                    </AnimatedSection>
                                </LeftSidebar>
                            )}

                            <MainContent isPortfolioPage={false}>
                                <AnimatedSection delay={0.3}>{children}</AnimatedSection>
                            </MainContent>

                            {shouldShowHeader && !isMobile && (
                                <RightSidebar>
                                    <AnimatedSection delay={0.3}>
                                        <ProfileSection>
                                            <StyledCard
                                                key={'id'}
                                                style={{
                                                    variant: 'light',
                                                    padding: 'sm',
                                                    size: 'sm',
                                                }}
                                            >
                                                <ProfileImage
                                                    src={CONFIG.profile.imageUrl}
                                                    alt="Profile"
                                                />
                                                <ProfileName>{CONFIG.profile.username}</ProfileName>
                                                <ProfileBio>{CONFIG.profile.fullName}</ProfileBio>
                                                <TagContainer>
                                                    <Tag>frontend</Tag>
                                                    <Tag>react-js</Tag>
                                                </TagContainer>
                                            </StyledCard>
                                            <ContactTitle>🔗 Contact</ContactTitle>
                                            <StyledCard
                                                key={'id'}
                                                style={{
                                                    variant: 'light',
                                                    padding: 'sm',
                                                    size: 'sm',
                                                }}
                                            >
                                                <ContactList>
                                                    <ContactItem>
                                                        <GithubFilled />
                                                        <ContactItemLink
                                                            href={CONFIG.profile.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            github
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                    <ContactItem>
                                                        <LinkedinFilled />
                                                        <ContactItemLink
                                                            href={CONFIG.profile.linkedinUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            linkedin
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                    <ContactItem>
                                                        <MailFilled />
                                                        <ContactItemLink
                                                            href={`mailto:${CONFIG.profile.email}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            gmail
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                </ContactList>
                                            </StyledCard>
                                        </ProfileSection>
                                    </AnimatedSection>
                                </RightSidebar>
                            )}
                            {isMobile && shouldShowHeader && (
                                <>
                                    <RightSidebar>
                                        <ProfileSection>
                                            <StyledCard
                                                key={'id'}
                                                style={{
                                                    variant: 'light',
                                                    padding: 'sm',
                                                    size: 'sm',
                                                }}
                                            >
                                                <ProfileImage
                                                    src={CONFIG.profile.imageUrl}
                                                    alt="Profile"
                                                />
                                                <ProfileName>{CONFIG.profile.username}</ProfileName>
                                                <ProfileBio>{CONFIG.profile.fullName}</ProfileBio>
                                                <TagContainer>
                                                    <Tag>frontend</Tag>
                                                    <Tag>react-js</Tag>
                                                </TagContainer>
                                            </StyledCard>
                                            <ContactTitle>🔗 Contact</ContactTitle>
                                            <StyledCard
                                                key={'id'}
                                                style={{
                                                    variant: 'light',
                                                    padding: `${themeColor.breakpoints.mobile ? 'sm' : 'md'}`,
                                                    size: 'sm',
                                                }}
                                            >
                                                <ContactList>
                                                    <ContactItem>
                                                        <GithubFilled />
                                                        <ContactItemLink
                                                            href={CONFIG.profile.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            github
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                    <ContactItem>
                                                        <LinkedinFilled />
                                                        <ContactItemLink
                                                            href={CONFIG.profile.linkedinUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            linkedin
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                    <ContactItem>
                                                        <MailFilled />
                                                        <ContactItemLink
                                                            href={`mailto:${CONFIG.profile.email}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            gmail
                                                        </ContactItemLink>
                                                    </ContactItem>
                                                </ContactList>
                                            </StyledCard>
                                        </ProfileSection>
                                    </RightSidebar>
                                </>
                            )}
                        </>
                    )}
                </ContentWrapper>
            </MaxWidthContainer>
            {['/about', '/projects', '/resume', '/contact'].includes(location.pathname) ? (
                <Footer isDarkMode={theme === 'dark'} />
            ) : (
                <div></div>
            )}
        </LayoutContainer>
    );
}
