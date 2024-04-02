import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Writing from "./pages/Writing";
import UpdatePost from "./pages/UpdatePost";
import { PreviewArticle } from "./pages/PreviewArticle";
import OverviewPosts from "./pages/OverviewPosts";
import NotFound from "./pages/NotFound";
import DearDigitalDairyForm from "./pages/DearDigitalDairyForm";
import PreviewDairyItem from "./pages/PreviewDairyItem";
import UpdateDairyItem from "./pages/UpdateDairyItem";
import DearDigitalDairy from "./pages/DearDigitalDairy";
import DairyItemPage from "./pages/DairyItemPage";

const App = () => {
  return (
      <Router>
      <Routes>
        {/* public routes */}
        <Route index Component={HomePage} />
        <Route path="aboutus" Component={AboutUsPage} />
        <Route path="articles/:type" Component={ArticlesPage} />
        <Route path="articles/:type/:articleId" Component={ArticlePage} />
        <Route path="diary" Component={DearDigitalDairy} />
        <Route path="diary/:id" Component={DairyItemPage} />
        {/* Dashboard routes */}
        <Route path="login" Component={Login} />
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        >
          <Route path="overview" Component={OverviewPosts} />
          <Route path="preview/:id" Component={PreviewArticle} />
          <Route path="writing" Component={Writing} />
          <Route path="update/:id" Component={UpdatePost} />
          <Route path="diary" Component={DearDigitalDairyForm} />
          <Route path="diary/preview/:id" Component={PreviewDairyItem} />
          <Route path="diary/update/:id" Component={UpdateDairyItem} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
