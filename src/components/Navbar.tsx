import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AppProps } from "@/types/index.ts";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { themeColor } from "@/tools/index.ts";
import { Button } from "./common/Button";

const Nav = styled.nav`
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_background
      : themeColor.light_gray_background};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 0.5px rgb(211, 211, 211);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.light_gray_text_color
      : themeColor.gray_text_color};
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
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color};
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
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 14px;
  transition: all 0.2s ease-out;

  &:hover,
  &.active {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.07)"};
    transform: translateY(-3px);
    box-shadow: 0 2px 8px
      ${({ theme }) =>
        theme.mode === "dark"
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.03)"};
  }
  &.active {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.07)"};

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50px;
      background-color: ${({ theme }) => theme.primary};
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
  padding: 0.5rem 1rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color
    };
`;

const LanguageDropdown = styled.div`
  padding: 0.5rem 0.7rem;
  border-radius: 14px;
  position: relative;
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color
  };
`;

const LanguageButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color};
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.07)"};
  border-radius: 14px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.09)"};
    transform: translateY(-2px);
  }
`;

const LanguageOptions = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_background
      : themeColor.light_gray_background};
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"};
  border-radius: 14px;
  padding: 0.5rem;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  min-width: 100px;
  z-index: 10;
  box-shadow: 0 4px 12px
    ${({ theme }) =>
      theme.mode === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"};
`;

const LanguageOptionButton = styled(Button)`
  color: ${({ theme }) =>
    theme.mode === "dark"
      ? themeColor.gray_text_color
      : themeColor.light_gray_text_color};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease-out;
  text-transform: uppercase;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.07)"};
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
