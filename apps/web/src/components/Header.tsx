import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppProps } from '@/types/index.ts';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Languages, X, Menu, FileTextIcon, BookIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getHoverStyles, getThemeStyles } from '@/themes';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { themeColor } from '@/themes/color';
import Button from '@/components/Common/Button';

const commonButtonStyles = `
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease-out;
`;

const Nav = styled.nav<{ $isPortfolioPage?: boolean; $isScrolled?: boolean }>`
    display: flex;
    justify-content: center;
    padding: 14px 0;
    ${({ theme, $isPortfolioPage, $isScrolled }) =>
        $isPortfolioPage
            ? `background-color: ${
                  $isScrolled
                      ? theme.mode === 'dark'
                          ? 'rgba(28, 28, 28, 0.75)'
                          : 'rgba(248, 248, 248, 0.75)'
                      : 'transparent'
              };
         --tw-backdrop-blur: blur(12px);
         backdrop-filter: var(--tw-backdrop-blur);`
            : getThemeStyles(theme, ['background', 'text'])};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: ${({ $isPortfolioPage }) =>
        $isPortfolioPage ? 'none' : '0 0.1px 0.5px 0 rgba(0, 0, 0, 0.05)'};
    transition: all 0.3s ease;
    overflow: hidden;
`;

const NavContainer = styled.div<{ $isPortfolioPage?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding-left: 9px;
    padding-right: 0;

    ${themeColor.breakpoints.tablet} {
        padding: 0 15px;
    }

    ${themeColor.breakpoints.mobile} {
        padding: 0 10px;
    }
`;

const Logo = styled(Link)`
    font-size: 1.25rem;
    font-weight: 600;
    ${({ theme }) => getThemeStyles(theme, 'text')};
    text-decoration: none;

    ${themeColor.breakpoints.mobile} {
        font-size: 1.1rem;
        margin-left: 0.5rem;
    }
`;

const NavList = styled.ul<{ $isOpen?: boolean; $isPortfolioMode?: boolean }>`
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 4rem;

    ${themeColor.breakpoints.tablet} {
        margin-left: 2rem;
    }

    ${themeColor.breakpoints.mobile} {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        flex-direction: column;
        ${({ theme }) => getThemeStyles(theme, 'background')};
        padding: 1rem 1rem;
        margin-left: 0;
        transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
        opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
        height: ${({ $isOpen }) => ($isOpen ? 'auto' : 0)};
        transition: all 0.3s ease-in-out;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 999;
        overflow-y: auto;
        max-height: calc(100vh - 60px);

        ${({ $isPortfolioMode, theme }) =>
            $isPortfolioMode &&
            `
      background-color: ${theme.mode === 'dark' ? 'rgba(28, 28, 28, 0.95)' : 'rgba(248, 248, 248, 0.95)'};
      backdrop-filter: blur(10px);
    `}
    }
`;

const NavItem = styled(Link)<{ $isPortfolioItem?: boolean; $isDarkMode?: boolean }>`
    ${({ theme, $isPortfolioItem, $isDarkMode }) =>
        $isPortfolioItem
            ? `color: ${$isDarkMode ? '#FFFFFF' : '#282828'};
         font-weight: 500;
         padding: 6px 12px;
         border-radius: 1px;
         background-color: ${$isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
         &:hover { 
           opacity: 0.9;
           background-color: ${$isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
         }`
            : getThemeStyles(theme, 'text')};
    text-decoration: none;
    font-size: ${(props) => (props.$isPortfolioItem ? '1rem' : '16px')};
    ${(props) => !props.$isPortfolioItem && commonButtonStyles};
    border-radius: ${(props) => (props.$isPortfolioItem ? '6px' : '14px')};
    transition: all 0.2s ease-out;
    position: relative;

    outline: none;
    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:hover,
    &.active {
        ${({ theme, $isPortfolioItem }) => !$isPortfolioItem && getHoverStyles(theme)};
        transform: ${(props) => props.$isPortfolioItem && 'translateY(-3px)'};
        box-shadow: ${({ theme, $isPortfolioItem }) =>
            !$isPortfolioItem && `0 2px 8px ${getThemeStyles(theme, 'shadow')}`};
    }

    &.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        border-radius: 50px;
        transition: all 0.2s ease-in-out;
        display: ${(props) => (props.$isPortfolioItem ? 'none' : 'block')};
    }

    ${themeColor.breakpoints.mobile} {
        padding: ${(props) => (props.$isPortfolioItem ? '0.75rem 1rem' : '0.5rem 2px')};
        width: 100%;
        display: block;
        text-align: center;

        &:hover,
        &.active {
            transform: ${(props) => (props.$isPortfolioItem ? 'none' : 'none')};
            box-shadow: none;
            opacity: ${(props) => (props.$isPortfolioItem ? '1' : 'inherit')};
            background-color: ${(props) =>
                props.$isPortfolioItem &&
                (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
            border-radius: ${(props) => props.$isPortfolioItem && '8px'};
        }
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
`;

const NavLinksPortfolio = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  ${themeColor.breakpoints.mobile} {
    padding-right;
    justify-content: flex-end;
    width: 100%;
  }
`;

const Controls = styled.div`
    display: flex;
    gap: 0.4rem;
    align-items: center;
    z-index: 1001;

    ${themeColor.breakpoints.mobile} {
        gap: 0.1rem;
        margin-left: auto;
    }
`;

const ThemeToggle = styled(Button)`
    padding: 0.4rem 1rem;
    border-radius: 10px;
    transition: all 0.2s ease-out;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => getThemeStyles(theme, 'text')};
    z-index: 1001;

    &:hover {
        transform: translateY(-2px);
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? getThemeStyles(theme, 'background')
                : getThemeStyles(theme, 'hover')};

        svg {
            color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#282828')};
            transition: all 0.2s ease-out;
            transform: scale(1.1);
        }
    }

    ${themeColor.breakpoints.mobile} {
        padding: 0.5rem;
        width: 36px;
        height: 36px;
    }
`;

const LanguageDropdown = styled.div`
    padding: 0.4rem 0.7rem;
    border-radius: 14px;
    position: relative;
    ${({ theme }) => getThemeStyles(theme, 'text')};

    &:hover {
        transform: translateY(-2px);
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? getThemeStyles(theme, 'background')
                : getThemeStyles(theme, 'hover')};

        svg {
            color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#282828')};
            transition: all 0.2s ease-out;
            transform: scale(1.1);
        }
    }

    ${themeColor.breakpoints.mobile} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const LanguageButton = styled(Button)`
    padding: 0.5rem 0.7rem;
    ${({ theme }) => getThemeStyles(theme, ['background', 'text'])};
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-out;

    ${themeColor.breakpoints.mobile} {
        padding: 0.5rem;
        width: 36px;
        height: 36px;
    }

    &:hover {
        ${({ theme }) => getHoverStyles(theme)};
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? getThemeStyles(theme, 'background')
                : getThemeStyles(theme, 'hover')};
        color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#282828')};
        transform: translateY(-2px);
    }
    svg {
        color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#282828')};
    }
`;

const LanguageOptions = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    top: 100%;
    right: 0;
    ${({ theme }) => getThemeStyles(theme, ['background', 'text'])};
    border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF1A' : '#0000001A')};
    border-radius: 14px;
    padding: 0.5rem;
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    flex-direction: column;
    gap: 0.5rem;
    min-width: 80px;
    z-index: 10;
`;

const LanguageOptionButton = styled(Button)<{ $isActive?: boolean }>`
    padding: 6px 8px;
    border-radius: 8px;
    transition: all 0.2s ease-out;
    text-transform: uppercase;
    font-size: 0.81rem;
    width: 100%;
    text-align: left;
    border: none;
    background: ${({ theme, $isActive }) =>
        $isActive ? (theme.mode === 'dark' ? '#ffffff1a' : '#0000001a') : 'transparent'};
    color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : getThemeStyles(theme, 'text'))};

    &:hover {
        background: ${({ theme }) =>
            theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        transform: translateX(2px);
        color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#282828')};
    }
`;

const MenuButton = styled(Button)`
    display: none;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    z-index: 1001;

    ${themeColor.breakpoints.mobile} {
        display: flex;
        padding: 0.2rem 1rem;
        border-radius: 14px;
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const IconLink = styled.a<{ $isDarkMode?: boolean; $isActive?: boolean }>`
    color: ${(props) => (props.$isDarkMode ? '#FFFFFF' : '#282828')};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 1px;
    position: relative;

    .link-text {
        max-width: ${(props) => (props.$isActive ? '100px' : '0')};
        overflow: hidden;
        white-space: nowrap;
        opacity: ${(props) => (props.$isActive ? '1' : '0')};
        margin-left: ${(props) => (props.$isActive ? '6px' : '0')};
        transition: all 0.3s ease;
    }

    &:hover {
        .link-text {
            max-width: 100px;
            opacity: 1;
            margin-left: 6px;
        }
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: ${(props) => (props.$isActive ? '100%' : '0')};
        height: 2px;
        color: '#9d76ff';
        background-color: ${(props) => (props.$isActive ? '#9d76ff' : 'transparent')};
        transition: all 0.3s ease;
    }

    svg {
        min-width: 20px;
        width: 20px;
        height: 20px;
    }
`;

const LogoContainer = styled.div`
    display: flex;

    ${themeColor.breakpoints.mobile} {
        padding: 0;
    }
`;

export default function Navbar({ onToggleTheme, theme }: AppProps) {
    const { t, i18n } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dropDownRef = useRef<HTMLDivElement>(null);

    const isPortfolioPage = ['/about', '/projects', '/resume', '/contact'].includes(
        location.pathname
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setShowLanguages(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        if (isPortfolioPage) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isPortfolioPage]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = () => {
        setShowLanguages(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget?.closest('.language-dropdown')) {
            setShowLanguages(false);
        }
    };

    const switchLanguage = (lang: string) => {
        void i18n.changeLanguage(lang);
        setShowLanguages(false);
    };

    return (
        <Nav $isPortfolioPage={isPortfolioPage} $isScrolled={isScrolled}>
            <NavContainer $isPortfolioPage={isPortfolioPage}>
                {isPortfolioPage ? (
                    <div></div>
                ) : (
                    <LogoContainer>
                        <Logo to="/"> sardor-m</Logo>
                    </LogoContainer>
                )}
                <RightSection>
                    {isPortfolioPage ? (
                        <NavLinksPortfolio>
                            <IconLink href="/" $isDarkMode={theme === 'dark'} $isActive={false}>
                                <BookIcon size={20} />
                                <span className="link-text">Blogs</span>
                            </IconLink>
                            <IconLink
                                href="https://github.com/sardor-m"
                                target="_blank"
                                rel="noopener noreferrer"
                                $isDarkMode={theme === 'dark'}
                                $isActive={false}
                            >
                                <GithubOutlined size={20} />
                                <span className="link-text">GitHub</span>
                            </IconLink>
                            <IconLink
                                href="/resume"
                                $isDarkMode={theme === 'dark'}
                                $isActive={location.pathname === '/resume'}
                            >
                                <FileTextIcon size={20} />
                                <span className="link-text">Resume</span>
                            </IconLink>
                            <IconLink
                                href="https://www.linkedin.com/in/sardor-m/"
                                target="_blank"
                                rel="noopener noreferrer"
                                $isDarkMode={theme === 'dark'}
                                $isActive={false}
                            >
                                <LinkedinOutlined size={20} />
                                <span className="link-text">LinkedIn</span>
                            </IconLink>
                            <ThemeToggle onClick={onToggleTheme} variant="ghost">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </ThemeToggle>
                        </NavLinksPortfolio>
                    ) : (
                        <>
                            <NavList $isOpen={isMenuOpen}>
                                <li>
                                    <NavItem
                                        to="/"
                                        className={location.pathname === '/' ? 'active' : ''}
                                    >
                                        {t('navbar.blogs')}
                                    </NavItem>
                                </li>
                                <li>
                                    <NavItem
                                        to="/about"
                                        className={location.pathname === '/about' ? 'active' : ''}
                                    >
                                        {t('navbar.about')}
                                    </NavItem>
                                </li>
                            </NavList>
                            <Controls>
                                <ThemeToggle onClick={onToggleTheme} variant="ghost">
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </ThemeToggle>
                                <LanguageDropdown
                                    ref={dropDownRef}
                                    className="language-dropdown"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <LanguageButton variant="ghost">
                                        <Languages size={19} />
                                    </LanguageButton>
                                    <LanguageOptions $isVisible={showLanguages}>
                                        <LanguageOptionButton
                                            variant="ghost"
                                            onClick={() => switchLanguage('en')}
                                            $isActive={i18n.language === 'en'}
                                        >
                                            {t('navbar.languages.english')}
                                        </LanguageOptionButton>
                                        <LanguageOptionButton
                                            variant="ghost"
                                            onClick={() => switchLanguage('uz')}
                                            $isActive={i18n.language === 'uz'}
                                        >
                                            {t('navbar.languages.uzbek')}
                                        </LanguageOptionButton>
                                    </LanguageOptions>
                                </LanguageDropdown>
                                <MenuButton variant="ghost" onClick={toggleMenu}>
                                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </MenuButton>
                            </Controls>
                        </>
                    )}
                </RightSection>
            </NavContainer>
        </Nav>
    );
}
