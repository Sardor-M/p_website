import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { getThemeStyles } from '@/themes';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { themeColor } from '@/themes/color';

type LayoutProps = {
    children: ReactNode;
    onToggleTheme: () => void;
    theme: 'light' | 'dark';
};

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
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 80px 20px 10px;
    min-height: calc(100vh - 120px);
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    ${themeColor.breakpoints.tablet} {
        padding: 70px 15px 15px;
        max-width: 900px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 70px 10px 60px 10px;
        min-height: auto;
        max-width: 100%;
    }
`;

const MainContent = styled.main<{ $isPortfolioPage: boolean }>`
    flex: 1;
    width: 100%;
    padding: ${(props) => (props.$isPortfolioPage ? '60px 0' : '0')};
    overflow-y: visible;
    overflow-x: hidden;
    min-width: 0;
    max-width: 700px;
    margin: 0 auto;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 0.1px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => (theme.mode === 'dark' ? '#444' : '#ccc')};
        border-radius: 0.1px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: ${(props) => (props.$isPortfolioPage ? '10px' : '0 10px')};
        width: 100%;
        max-height: none;
        max-width: 100%;
        overflow-y: visible;
        height: auto;
        flex-shrink: 0;
    }
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
    const location = useLocation();
    const isBlogDetailsPage = location.pathname.startsWith('/blog/');
    const shouldShowHeader = !isBlogDetailsPage;

    return (
        <LayoutContainer>
            {shouldShowHeader && <Header onToggleTheme={onToggleTheme} theme={theme} />}
            <MaxWidthContainer>
                <ContentWrapper style={{ paddingTop: shouldShowHeader ? '80px' : '20px' }}>
                    {['/about', '/projects', '/resume', '/contact'].includes(location.pathname) ? (
                        <MainContent $isPortfolioPage={true}>
                            <AnimatedSection delay={0.3}>{children}</AnimatedSection>
                        </MainContent>
                    ) : (
                        <>
                            <MainContent $isPortfolioPage={false}>
                                <AnimatedSection delay={0.3}>{children}</AnimatedSection>
                            </MainContent>
                        </>
                    )}
                </ContentWrapper>
            </MaxWidthContainer>
            <Footer isDarkMode={theme === 'dark'} />
        </LayoutContainer>
    );
}
