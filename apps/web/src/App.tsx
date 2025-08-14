import CustomCursor from './components/Common/CustomCursor';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes';
import { darkTheme, lightTheme } from '@/themes/themes/themes';
import { useState } from 'react';
import GlobalStyle from '@/themes/themes/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ThemeTypes = 'light' | 'dark';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    const [theme, setTheme] = useState<ThemeTypes>('light');

    const handleToggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle />
                <CustomCursor />
                <AppRoutes onToggleTheme={handleToggleTheme} theme={theme} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
