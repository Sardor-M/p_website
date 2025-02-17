import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DepartureMono-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2409-1@1.0/DepartureMono-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family: 'DepartureMono-Regular', sans-serif;  
  }
`;

export default GlobalStyle;
