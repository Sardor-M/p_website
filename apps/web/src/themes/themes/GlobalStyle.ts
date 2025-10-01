import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* inter as primary UI font */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

 /* geist as primary code block font */
  @font-face {
    font-family: 'Geist';
    src: url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    font-weight: normal;
    font-style: normal;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                 Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    font-weight: normal;
    font-style: normal;
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch; /* iOS momentum scroll */
    /* Hide scrollbars across browsers while keeping scroll functionality */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  body { scrollbar-width: none; -ms-overflow-style: none; }
  html::-webkit-scrollbar, body::-webkit-scrollbar { width: 0px; height: 0px; background: transparent; }
  html::-webkit-scrollbar-track, body::-webkit-scrollbar-track { background: transparent; }
  html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb { background: transparent; border: none; }
  
  #root {
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: visible;
    position: relative;
  }
  
  a {
    text-decoration: inherit;
  }
  
  button { font-family: inherit; }
`;

export default GlobalStyle;
