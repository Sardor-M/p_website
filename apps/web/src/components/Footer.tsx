import styled from 'styled-components';
import { DarkModeProps } from '@/types/blog';
import { themeColor } from '@/themes/color';
import { GithubFilled, LinkedinFilled, MailFilled } from '@ant-design/icons';
import { CONFIG } from '@/config/site.config';

const FooterWrapper = styled.div<{ $isDarkMode: boolean }>`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

const FooterContainer = styled.footer<{ $isDarkMode: boolean }>`
    padding: 18px 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 720px;
    margin: 0 auto;

    ${themeColor.breakpoints.tablet} {
        padding: 16px 15px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 16px 20px;
    }
`;

const FooterText = styled.p<{ $isDarkMode: boolean }>`
    color: ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')};
    font-size: 0.85rem;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: -0.003em;
    text-align: left;
`;

const Icons = styled.div`
    display: flex;
    gap: 10px;
    a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    a:hover {
        opacity: 1;
    }
`;

export default function Footer({ isDarkMode }: DarkModeProps) {
    const currentYear = new Date().getFullYear();

    return (
        <FooterWrapper $isDarkMode={isDarkMode}>
            <FooterContainer $isDarkMode={isDarkMode}>
                <FooterText $isDarkMode={isDarkMode}>
                    © {currentYear} Sardor Madaminov. All rights reserved.
                </FooterText>
                <Icons>
                    <a href={CONFIG.profile.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubFilled />
                    </a>
                    <a href={CONFIG.profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <LinkedinFilled />
                    </a>
                    <a
                        href={`mailto:${CONFIG.profile.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MailFilled />
                    </a>
                </Icons>
            </FooterContainer>
        </FooterWrapper>
    );
}
