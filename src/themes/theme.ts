import { DefaultTheme } from 'styled-components';
import { themeColor } from '../tools';

export const lightTheme: DefaultTheme = {
  name: "light",
  mode: 'light',
  bodyBg: themeColor.light_gray_background,
  textColor: themeColor.light_gray_text_color,
  cardBg: themeColor.light_gray_background,
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  mode: 'dark',
  bodyBg: themeColor.gray_background,
  textColor: themeColor.gray_text_color,
  cardBg: themeColor.gray_text_color,
};
