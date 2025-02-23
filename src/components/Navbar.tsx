import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "@/types/index.ts";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { getHoverStyles, getThemeStyles } from "@/themes";
import { Button } from "./common/Button";

//shared common button styles
const commonButtonStyles = `
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease-out;
`;

const Nav = styled.nav`
  padding: 1rem;
  ${({ theme }) => getThemeStyles(theme, ["background", "text"])};
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
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  ${({ theme }) => getThemeStyles(theme, "text")};
  text-decoration: none;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 4rem;
`;

const NavItem = styled(Link)`
  ${({ theme }) => getThemeStyles(theme, "text")};
  text-decoration: none;
  font-weight: 500;
  ${commonButtonStyles};
  border-radius: 14px;
  transition: all 0.2s ease-out;

  &:hover,
  &.active {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateY(-3px);
    box-shadow: 0 2px 8px
      ${({ theme }) => getThemeStyles(theme, "shadow")}
  &.active {
    ${({ theme }) => getHoverStyles(theme)};

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50px;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const ThemeToggle = styled(Button)`
  ${commonButtonStyles};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => getThemeStyles(theme, "text")};
`;

const LanguageDropdown = styled.div`
  padding: 0.5rem 0.7rem;
  border-radius: 14px;
  position: relative;
  ${({ theme }) => getThemeStyles(theme, "text")};
`;

const LanguageButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  ${({ theme }) => getThemeStyles(theme, ["background", "text"])};
  border-radius: 14px;
  transition: all 0.2s ease-out;

  &:hover {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateY(-2px);
  }
`;

const LanguageOptions = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  ${({ theme }) => getThemeStyles(theme, "background")};
  border: 1px solid ${({ theme }) => getThemeStyles(theme, "border")};
  border-radius: 14px;
  padding: 0.5rem;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  min-width: 100px;
  z-index: 10;
  box-shadow: 0 4px 12px
    ${({ theme }) => getThemeStyles(theme, 'shadow')};
`;

const LanguageOptionButton = styled(Button)`
  ${({ theme }) => getThemeStyles(theme, "text")};
  ${commonButtonStyles};
  border-radius: 10px;
  transition: all 0.2s ease-out;
  text-transform: uppercase;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;

  &:hover {
    ${({ theme }) => getHoverStyles(theme)};
    transform: translateX(2px);
  }
`;

export default function Navbar({ onToggleTheme, theme }: AppProps) {
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setShowLanguages(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest(".language-dropdown")) {
      setShowLanguages(false);
    }
  };

  const switchLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    setShowLanguages(false);
    console.log(t);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">sardor-m blog</Logo>
        <Controls>
          <NavList>
            <li>
              <NavItem
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Blogs
              </NavItem>
            </li>
            <li>
              <NavItem
                to="/portfolio"
                className={location.pathname === "/portfolio" ? "active" : ""}
              >
                Portfolio
              </NavItem>
            </li>
          </NavList>
          <ThemeToggle onClick={onToggleTheme} variant="ghost">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggle>

          <LanguageDropdown
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
                onClick={() => switchLanguage("en")}
              >
                eng
              </LanguageOptionButton>
              <LanguageOptionButton
                variant="ghost"
                onClick={() => switchLanguage("uz")}
              >
                o'zb
              </LanguageOptionButton>
            </LanguageOptions>
          </LanguageDropdown>
        </Controls>
      </NavContainer>
    </Nav>
  );
}
