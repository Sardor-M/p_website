import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Portfolio from "@/pages/Portfolio/Portfolio";
import { AppProps } from "@/types";
import Blog from "@/pages/Blog/Blog";
import BlogDetails from "@/pages/Blog/BlogDetails";
import { FilterProvider } from "@/context/FilterContext";


export default function AppRoutes({onToggleTheme, theme}: AppProps) {
  return (
    <BrowserRouter>
    <FilterProvider>
      <Layout onToggleTheme={onToggleTheme} theme={theme} >
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/:id" element={<BlogDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
      </FilterProvider>
    </BrowserRouter>
  );
}