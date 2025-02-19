import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./themes/themes/GlobalStyle";

const Root = () => {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
