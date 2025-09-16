import { DefaultTheme } from 'styled-components';
import { themeColor } from '@/themes/color';

export const lightTheme: DefaultTheme = {
    name: 'light',
    mode: 'light',
    bodyBg: themeColor.background.light,
    textColor: themeColor.text.light,
    cardBg: themeColor.background.light,
};

export const darkTheme: DefaultTheme = {
    name: 'dark',
    mode: 'dark',
    bodyBg: themeColor.background.dark,
    textColor: themeColor.text.dark,
    cardBg: themeColor.background.dark,
};
