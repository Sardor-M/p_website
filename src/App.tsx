import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes";
import { darkTheme, lightTheme } from "./themes/themes/theme";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AppRoutes onToggleTheme={handleToggleTheme} theme={theme} />;
    </ThemeProvider>
  );
}

export default App;
