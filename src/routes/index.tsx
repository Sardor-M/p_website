import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Layout from "../components/layout";
import Portfolio from "../pages/Portfolio/Portfolio";
import Blog from "../pages/Blog/Blog";
import { AppProps } from "../types";


export default function AppRoutes({onToggleTheme}: AppProps) {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage onToggleTheme={onToggleTheme} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}