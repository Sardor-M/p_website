import CustomCursor from './components/Common/CustomCursor';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes';
import { darkTheme, lightTheme } from '@/themes/themes/themes';
import { useEffect, useState } from 'react';
import { initializeDOMPurify } from './utils/security';
import GlobalStyle from './themes/themes/GlobalStyle';

type ThemeTypes = 'light' | 'dark';

export default function App() {
    const [theme, setTheme] = useState<ThemeTypes>('light');

    const handleToggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        initializeDOMPurify();

        // we apply theme to body for better mobile compatibility
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <CustomCursor />
            <AppRoutes onToggleTheme={handleToggleTheme} theme={theme} />;
        </ThemeProvider>
    );
}
