type ThemeProperty = "background" | "text";

export const themeColor = {
  background: {
    dark: "#1C1C1C",
    light: "#F8F8F8",
  },
  text: {
    dark: "#FFFFFF",
    light: "#282828",
  },
  hover: {
    dark: "#ffffff0d",
    light: "#00000012",
  },
  activeHover: {
    dark: "#ffffff14",
    light: "#00000017",
  },
  border: {
    dark: "#ffffff1a",
    light: "#0000001a",
  },
  shadow: {
    dark: "#0000004d",
    light: "#0000001a",
  },
};

// mixin yaratamiz ( ikki xil turdagi)
const getThemeValue = (theme: any, property: ThemeProperty) => {
  switch (property) {
    case "background":
      return theme.mode === "dark"
        ? themeColor.background.dark
        : themeColor.background.light;
    case "text":
      return theme.mode === "dark"
        ? themeColor.text.dark
        : themeColor.text.light;
    default:
      return "";
  }
};

export const getThemeStyles = (
  theme: any,
  properties: ThemeProperty | ThemeProperty[]
) => {
   // bu esa single property uchun
  if (typeof properties === "string") {
    const value = getThemeValue(theme, properties);
    return properties === "background"
      ? `background-color : ${value};`
      : `color: ${value};`;
  }

  // agar ikkila propertylar pass qilinsa
  return properties
    .map((prop) => {
      const value = getThemeValue(theme, prop);
      return prop === "background"
        ? `background-color: ${value};`
        : `color: ${value};`;
    })
    .join(" ");
};

// hover effect for mixin
export const getHoverStyles = (theme: any) => `
    background-color: ${
      theme.mode === "dark" ? themeColor.hover.dark : themeColor.hover.light
    };
  `;
