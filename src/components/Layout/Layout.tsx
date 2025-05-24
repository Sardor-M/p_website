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
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;

  ${themeColor.breakpoints.mobile} {
    max-height: none;
    min-height: 100vh;
    height: auto;
    overflow: auto;
    padding-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  height: auto;

  ${themeColor.breakpoints.mobile} {
    flex-direction: column;
    min-height: 100vh;
    margin-bottom: 0;
    height: auto;
  }
`;

const LeftSidebar = styled.aside`
  width: 350px;
  padding: 2rem 1rem;
  position: fixed;
  left: 5%;
  top: 60px;
  bottom: 0;
  overflow-y: auto;

  ${themeColor.breakpoints.mobile} {
    position: relative;
    width: 100%;
    top: 0;
    padding: 2rem 1.5rem;
    margin-bottom: 1rem;
  }
  ${themeColor.breakpoints.tablet} {
    width: 250px;
  }
`;

const MainContent = styled.main<{ isPortfolioPage: boolean }>`
  position: ${(props) => (props.isPortfolioPage ? 'relative' : 'fixed')};
  top: ${(props) => (props.isPortfolioPage ? '0' : '80px')};
  left: ${(props) => (props.isPortfolioPage ? '0' : '310px')};
  right: ${(props) => (props.isPortfolioPage ? '0' : '360px')};
  bottom: 0;
  overflow-y: auto;
  padding: ${(props) => (props.isPortfolioPage ? '40px 20px' : '1rem')};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  ${themeColor.breakpoints.mobile} {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    padding: ${(props) => (props.isPortfolioPage ? '20px 20px 40px' : '0')};
    margin: 0;
    min-height: ${(props) => (props.isPortfolioPage ? 'calc(100vh - 60px)' : '50vh')};
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const RightSidebar = styled.aside`
  width: 400px;
  padding: 2rem 1rem;
  position: fixed;
  right: 5%;
  top: 60px;
  bottom: 0;
  overflow-y: auto;

  ${themeColor.breakpoints.mobile} {
    position: relative;
    width: 100%;
    top: 0;
    padding: 2rem 1.5rem;
    margin-bottom: 0;
  }
  ${themeColor.breakpoints.tablet} {
    width: 270px;
  }
`;

const TagSection = styled.section`
  margin: 1.5rem auto;
  padding-left: 70px;
  height: 100%;
  padding-right: 1rem;
  cursor: pointer;

  ${themeColor.breakpoints.mobile} {
    padding-left: 0;
    margin: 0.5rem auto;
  }
`;

const TagTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  padding: 0.5rem 0.6rem;
  border-radius: 14px;
  font-size: 0.8rem;
  gap: 0.5rem;
  margin: 0.6rem 0;
  transition: all 0.2s ease;

  &:hover {
    ${({ theme }) => getHoverStyles(theme)};
  }

  &.active {
    ${({ theme }) => getHoverStyles(theme)};
    font-weight: bold;
  }
`;

const ProfileSection = styled.section`
  text-align: center;
  margin-top: 30px;
  max-width: 280px;

  ${themeColor.breakpoints.mobile} {
    max-width: 100%;
    margin-top: 15px;
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
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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
  padding: 0.75rem;
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
  const isBlogDetailsPage = location.pathname.match(
    /^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  );
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
      <Header onToggleTheme={onToggleTheme} theme={theme} />
      <MaxWidthContainer>
        <ContentWrapper>
          {['/about', '/projects', '/resume', '/contact'].includes(location.pathname) ? (
            <MainContent
              isPortfolioPage={true}
              style={{
                position: 'relative',
                left: 0,
                right: 0,
                top: 0,
                padding: '0',
                minHeight: 'calc(100vh - 80px)',
                width: '100%',
              }}
            >
              <AnimatedSection delay={0.3}>{children}</AnimatedSection>
            </MainContent>
          ) : (
            <>
              {/* chap tomon sibebar (tags filter uchun) */}
              {!isBlogDetailsPage && (!isMobile || (isMobile && selectedTag === '')) && (
                <LeftSidebar>
                  <AnimatedSection delay={0.3}>
                    <TagSection>
                      <TagTitle>📌 Tags</TagTitle>
                      <TagList>
                        {TAG_LIST.map((tag) => (
                          <TagItem
                            key={tag}
                            onClick={() => handleTagsClick(tag)}
                            className={tag === selectedTag ? 'active' : ''}
                          >
                            {' '}
                            {tag}
                          </TagItem>
                        ))}
                      </TagList>
                    </TagSection>
                  </AnimatedSection>
                </LeftSidebar>
              )}

              {/* body content shu yerda  */}
              <MainContent isPortfolioPage={false}>
                <AnimatedSection delay={0.3}>{children}</AnimatedSection>
              </MainContent>

              {/* o'ng tomon contenti shu yerda */}
              {!isBlogDetailsPage && (!isMobile || (isMobile && location.pathname === '/')) && (
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
                        <ProfileImage src={CONFIG.profile.imageUrl} alt="Profile" />
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
