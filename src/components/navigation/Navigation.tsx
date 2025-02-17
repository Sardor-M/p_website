import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "../../types/index.ts";
import { Button } from "../common/Button.tsx";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { themeColor } from "../../tools/index.ts";

const Nav = styled.nav`
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? themeColor.gray_background : themeColor.light_gray_background};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 0.5px 4px rgba(0, 0, 0, 0.3)"
      : "0 0.5px 4px rgba(0, 0, 0, 0.1)"};
  color: ${({ theme }) => (theme.mode === "dark" ? themeColor.light_gray_text_color : themeColor.gray_text_color)};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => (theme.mode === "dark" ? themeColor.gray_text_color : themeColor.light_gray_text_color)};
  text-decoration: none;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 4rem;
`;

const NavItem = styled(Link)`
  color: ${({ theme }) => theme.mode === 'dark' ? themeColor.gray_text_color : themeColor.light_gray_text_color};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeToggle = styled(Button)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageDropdown = styled.div`
  position: relative;
`;

const LanguageButton = styled(Button)`
  padding: 0.5rem;
`;

const LanguageOptions = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.navBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  padding: 0.5rem;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  min-width: 100px;
  z-index: 10;
`;

export default function Navigation({ onToggleTheme, theme }: AppProps) {
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const switchLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    setShowLanguages(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">sardor-m blog</Logo>

        <NavList>
          <li>
            <NavItem to="/">Home</NavItem>
          </li>
          <li>
            <NavItem to="/portfolio">Portfolio</NavItem>
          </li>
          <li>
            <NavItem to="/blog">Blog</NavItem>
          </li>
        </NavList>

        <Controls>
          <ThemeToggle onClick={onToggleTheme} variant="ghost">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggle>

          <LanguageDropdown
            onMouseEnter={() => setShowLanguages(true)}
            onMouseLeave={() => setShowLanguages(false)}
          >
            <LanguageButton variant="ghost">
              <Languages size={20} />
            </LanguageButton>
            <LanguageOptions $isVisible={showLanguages}>
              <Button variant="ghost" onClick={() => switchLanguage("en")}>
                English
              </Button>
              <Button variant="ghost" onClick={() => switchLanguage("uz")}>
                O'zbek
              </Button>
            </LanguageOptions>
          </LanguageDropdown>
        </Controls>
      </NavContainer>
    </Nav>
  );
}
