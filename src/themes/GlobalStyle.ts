import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DepartureMono-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2409-1@1.0/DepartureMono-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    font-family: 'DepartureMono-Regular', sans-serif;
    overscroll-behavior: none;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
