import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route exact path="/" Component={HomePage} />
        <Route path="/aboutus" Component={AboutUsPage} />
        <Route path="/articles/:type" Component={ArticlesPage} />
        <Route path="/articles/:type/:articleId" Component={ArticlePage} />
      </Routes>
    </Router>
  );
};

export default App;
