import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    bodyBg: string;
    textColor: string;
    cardBg: string;
    // we will add later
  }
}
