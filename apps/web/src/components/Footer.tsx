import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { themeColor } from '@/themes/color';

const FooterWrapper = styled.div<{ isDarkMode: boolean }>`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const FooterContainer = styled.footer<{ isDarkMode: boolean }>`
    padding: 25px 284px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    max-width: 1440px;
    margin: 0 auto;

    ${themeColor.breakpoints.tablet} {
        padding: 16px 15px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 16px 20px;
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
