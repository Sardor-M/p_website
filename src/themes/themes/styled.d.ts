import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    mode: 'light' | 'dark' | string;
    bodyBg: string;
    textColor: string;
    cardBg: string;
  }
}
