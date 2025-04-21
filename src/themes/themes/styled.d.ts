import 'styled-components';

declare module 'styled-components' {
  export type DefaultTheme = {
    name: string;
    mode: string;
    bodyBg: string;
    textColor: string;
    cardBg: string;
  };
}
