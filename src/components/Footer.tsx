import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';

const FooterWrapper = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  position: relative;
  padding: 20px;
  margin-top: 40px;
`;

const FooterContainer = styled.footer<{ isDarkMode: boolean }>`
  padding: 16px 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;

  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const FooterText = styled.p<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')};
  font-size: 0.85rem;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: -0.003em;
  font-family: 'DepartureMono-Regular', monospace;
  text-align: left;
`;

export default function Footer({ isDarkMode }: DarkModeProps) {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper isDarkMode={isDarkMode}>
      <FooterContainer isDarkMode={isDarkMode}>
        <FooterText isDarkMode={isDarkMode}>
          © {currentYear} Sardor Madaminov. All rights reserved.
        </FooterText>
      </FooterContainer>
    </FooterWrapper>
  );
}
