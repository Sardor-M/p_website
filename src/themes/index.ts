import { themeColor } from "./color";

type Theme  = {
  mode: 'light' | 'dark' | string;
  // bodyBg?: string;
  // textColor?: string;
  // cardBg?: string;
}

type ThemeProperty =
  | "background"
  | "text"
  | "hover"
  | "activeHover"
  | "border"
  | "shadow";

// theme property ga asoslanib  css propertyni olamiz
const getCSSProperty = (property: ThemeProperty) => {
  switch (property) {
    case "background":
      return "background-color";
    case "text":
      return "color";
    case "hover":
      return "background-color";
    case "activeHover":
      return "background-color";
    case "border":
      return "border-color";
    case "shadow":
      return "box-shadow";
    default:
      return property;
  }
};

// mixin yaratamiz ( ikki xil turdagi)
const getThemeValue = (theme: Theme, property: ThemeProperty) => {
  switch (property) {
    case "background":
      return theme.mode === "dark"
        ? themeColor.background.dark
        : themeColor.background.light;
    case "text":
      return theme.mode === "dark"
        ? themeColor.text.dark
        : themeColor.text.light;
    case "hover":
      return theme.mode === "dark"
        ? themeColor.hover.dark
        : themeColor.hover.light;
    case "activeHover":
      return theme.mode === "dark"
        ? themeColor.activeHover.dark
        : themeColor.activeHover.light;
    case "border":
      return theme.mode === "dark"
        ? themeColor.border.dark
        : themeColor.border.light;
    case "shadow":
      return theme.mode === "dark"
        ? themeColor.shadow.dark
        : themeColor.shadow.light;
    default:
      return "";
  }
};

export const getThemeStyles = (
  theme: Theme,
  properties: ThemeProperty | ThemeProperty[]
) => {
  // bu esa single property uchun
  if (typeof properties === "string") {
    const value = getThemeValue(theme, properties);
    const cssProperty = getCSSProperty(properties);
    return `${cssProperty}: ${value};\n`;
  }

  // agar ikkila propertylar pass qilinsa
  return properties
    .map((prop) => {
      const value = getThemeValue(theme, prop);
      const cssProperty = getCSSProperty(prop);
      return `${cssProperty}: ${value};`;
    })
    .join("\n");
};

// adashib ketmaslik uchun alohida wrapper getHoverStyle yaratildi
export const getHoverStyles = (theme: Theme) => `
    background-color: ${getThemeValue(theme, "hover")};
  `;

// tepadagidek bunga ham wrapper qo'yildi
export const getActiveHoverStyles = (theme: Theme) => `
    background-color: ${getThemeValue(theme, "activeHover")};
`;
