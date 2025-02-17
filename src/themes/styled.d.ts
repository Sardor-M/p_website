import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    mode: string;
    bodyBg: string;
    textColor: string;
    cardBg: string;
  }
}