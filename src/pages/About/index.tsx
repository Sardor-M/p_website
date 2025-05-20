import styled from 'styled-components';
import AboutMe from '@/pages/About/About';
import Projects from '@/pages/Portfolio/Projects';
import ContactMe from '@/pages/Contact/Contact';
import { themeColor } from '@/themes/color';
import { DarkModeProps } from '@/types/blog';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 80px 50px 60px;
  min-height: 100vh;
  scroll-margin-top: 70px;

  ${themeColor.breakpoints.mobile} {
    padding: 30px 2px 2px;
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
