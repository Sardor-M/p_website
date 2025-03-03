import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DepartureMono-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2409-1@1.0/DepartureMono-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: 'DepartureMono-Regular', sans-serif;
    line-height: 1.5;
    font-weight: normal;
    font-style: normal;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000; /* Ensure background is black */
  }
  
  #root {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  
  a {
    text-decoration: inherit;
  }
  
  button {
    font-family: 'DepartureMono-Regular', sans-serif;
  }
`;

export default GlobalStyle;