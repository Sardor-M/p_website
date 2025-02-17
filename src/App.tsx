import AppRoutes from "./routes";
import { AppProps } from "./types";


function App({ onToggleTheme }: AppProps) {
  // const { t, i18n } = useTranslation();

  // const switchLanguage = (lang: string) => {
  //   void i18n.changeLanguage(lang);
  // };

  return <AppRoutes onToggleTheme={onToggleTheme}/>
}

export default App;
