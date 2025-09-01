import styled from 'styled-components';
import AboutMe from '@/pages/About/About';
import ContactMe from '@/pages/Contact/Contact';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';
import Projects from '@/pages/Portfolio/Projects';

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
    min-height: auto;
    scroll-margin-top: 70px;

    /* only first section specific styling */
    &:first-child {
        min-height: 40vh;
    }

    &:not(:first-child) {
        min-height: 100vh;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 30px 0 20px;
        min-height: auto;
        overflow: visible;
    }
`;

export default function RootPortfolio({ isDarkMode }: DarkModeProps) {
    return (
        <PageContainer>
            <Section id="about">
                <AboutMe isDarkMode={isDarkMode} />
            </Section>
            <Section id="projects">
                <Projects isDarkMode={isDarkMode} />
            </Section>
            <Section id="contact">
                <ContactMe isDarkMode={isDarkMode} />
            </Section>
        </PageContainer>
    );
}
