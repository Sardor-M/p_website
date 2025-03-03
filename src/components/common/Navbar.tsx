import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppProps } from '@/types/index.ts';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Languages, X, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getHoverStyles, getThemeStyles } from '@/themes';
import { media } from '@/themes/themes/media';
import { Button } from './Button';

//shared common button styles
const commonButtonStyles = `
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease-out;
`;

const Nav = styled.nav`
  padding: 1rem;
  ${({ theme }) => getThemeStyles(theme, ['background', 'text'])};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 0.5px rgb(211, 211, 211);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 70px;

  ${media.desktop} {
    padding: 0 70px;
  }
  ${media.tablet} {
    padding: 0 40px;
  }
  ${media.mobile} {
    padding: 0 16px;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  text-decoration: none;

  ${media.mobile} {
    font-size: 1.1rem;
  }
`;

const NavList = styled.ul<{ isOpen?: boolean }>`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 4rem;

  ${media.tablet} {
    margin-left: 2rem;
  }

  ${media.mobile} {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    ${({ theme }) => getThemeStyles(theme, 'background')};
    padding: 1.5rem 2rem;
    margin-left: 0;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    height: ${({ isOpen }) => (isOpen ? 'auto' : 0)};
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
  }
`;

const NavItem = styled(Link)`
  cursor: pointer;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  text-decoration: none;
  font-weight: 500;
  ${commonButtonStyles};
  border-radius: 14px;
  transition: all 0.2s ease-out;
  position: relative;

  &:hover,
  &.active {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateY(-3px);
    box-shadow: 0 2px 8px ${({ theme }) => getThemeStyles(theme, 'shadow')};
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
  }

  ${media.mobile} {
    padding: 1rem 4px;
    width: 100%;
    display: block;
    text-align: center;

    &:hover,
    &.active {
      transform: translateX(5px);
      box-shadow: none;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  z-index: 1001;

  ${media.mobile} {
    gap: 0.1rem;
    margin-left: auto;
  }
`;

const ThemeToggle = styled(Button)`
  ${commonButtonStyles};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => getThemeStyles(theme, 'text')};
  z-index: 1001;

  ${media.mobile} {
    padding: 0.5rem;
    width: 36px;
    height: 36px;
  }
`;

const LanguageDropdown = styled.div`
  padding: 0.5rem 0.7rem;
  border-radius: 14px;
  position: relative;
  ${({ theme }) => getThemeStyles(theme, 'text')};

  ${media.mobile} {
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

  ${media.mobile} {
    padding: 0.5rem;
    width: 36px;
    height: 36px;
  }

  &:hover {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateY(-2px);
  }
`;

const LanguageOptions = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  ${({ theme }) => getThemeStyles(theme, ['background', 'text'])};
  border: 1px solid ${({ theme }) => getThemeStyles(theme, 'border')};
  border-radius: 14px;
  padding: 0.5rem;
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.5rem;
  min-width: 100px;
  z-index: 10;
  // box-shadow: 0 4px 12px ${({ theme }) => getThemeStyles(theme, 'shadow')};
`;

const LanguageOptionButton = styled(Button)<{ $isActive?: boolean }>`
  ${({ theme }) => getThemeStyles(theme, 'text')};
  ${commonButtonStyles};
  border-radius: 10px;
  transition: all 0.2s ease-out;
  text-transform: uppercase;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;
  background: ${({ theme, $isActive }) =>
    $isActive ? (theme.mode === 'dark' ? '#333333' : '#F0F0F0') : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive && theme.mode === 'dark' ? '#FFFFFF' : getThemeStyles(theme, 'text')};

  &:hover {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateX(2px);
  }
`;

const MenuButton = styled(Button)`
  display: none;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  z-index: 1001;

  ${media.mobile} {
    display: flex;
    padding: 0.5rem 0.7rem;
    border-radius: 14px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Navbar({ onToggleTheme, theme }: AppProps) {
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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
    <Nav>
      <NavContainer>
        <Logo to="/">{t('navbar.logo')}</Logo>
        <RightSection>
          <NavList isOpen={isMenuOpen}>
            <li>
              <NavItem to="/" className={location.pathname === '/' ? 'active' : ''}>
                {t('navbar.blogs')}
              </NavItem>
            </li>
            <li>
              <NavItem
                to="/portfolio"
                className={location.pathname === '/portfolio' ? 'active' : ''}
              >
                {t('navbar.portfolio')}
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
                <Languages size={20} />
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
        </RightSection>
      </NavContainer>
    </Nav>
  );
}
