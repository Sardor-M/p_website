import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { AppProps } from '@/types';
import Blog from '@/pages/Blog/Blog';
import BlogDetails from '@/pages/Blog/BlogDetails/BlogDetails';
import { FilterProvider } from '@/context/FilterContext';
import RootPortfolio from '@/pages/About';
import { themeColor } from '@/themes/color';
import styled from 'styled-components';
import Resume from '@/pages/Resume/Resume';

const PageContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
        max-width: 100%;
    }
`;

const Section = styled.section`
    padding: 0;
    min-height: 100vh;
    scroll-margin-top: 70px;

    ${themeColor.breakpoints.mobile} {
        padding: 30px 0 20px;
        min-height: auto;
        overflow: visible;
    }
`;

const ResumeWrapper = (props: { isDarkMode: boolean }) => {
    return (
        <PageContainer>
            <Section id="resume">
                <Resume isDarkMode={props.isDarkMode} />
            </Section>
        </PageContainer>
    );
};

export default function AppRoutes({ onToggleTheme, theme }: AppProps) {
    return (
        <BrowserRouter>
            <FilterProvider>
                <Layout onToggleTheme={onToggleTheme} theme={theme}>
                    <Routes>
                        <Route path="/" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetails />} />{' '}
                        <Route
                            path="/about"
                            element={<RootPortfolio isDarkMode={theme === 'dark'} />}
                        />
                        <Route
                            path="/resume"
                            element={<ResumeWrapper isDarkMode={theme === 'dark'} />}
                        />
                    </Routes>
                </Layout>
            </FilterProvider>
        </BrowserRouter>
    );
}
