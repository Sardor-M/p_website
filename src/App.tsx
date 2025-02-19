import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes";
import { darkTheme, lightTheme } from "@/themes/themes/themes";
import { useState } from "react";

type ThemeTypes = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<ThemeTypes>("light");

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AppRoutes onToggleTheme={handleToggleTheme} theme={theme} />;
    </ThemeProvider>
  );
}
