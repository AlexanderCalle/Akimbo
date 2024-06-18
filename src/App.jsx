import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Writing from "./pages/Dashboard/Articles/Writing";
import UpdatePost from "./pages/Dashboard/Articles/UpdatePost";
import { PreviewArticle } from "./pages/Dashboard/Articles/PreviewArticle";
import OverviewPosts from "./pages/Dashboard/OverviewPosts";
import NotFound from "./pages/NotFound";
import DearDigitalDairyForm from "./pages/Dashboard/Diary/DearDigitalDairyForm";
import PreviewDairyItem from "./pages/Dashboard/Diary/PreviewDairyItem";
import UpdateDairyItem from "./pages/Dashboard/Diary/UpdateDairyItem";
import DearDigitalDairy from "./pages/DearDigitalDairy";
import DairyItemPage from "./pages/DairyItemPage";
import OverviewArticles from "./pages/Dashboard/Articles/OverviewArticles";
import OverviewDiary from "./pages/Dashboard/Diary/OverviewDiary";
import UsersPage from "./pages/Dashboard/Users/UsersPage";

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
          <Route path="articles" Component={OverviewArticles} /> 
          <Route path="articles/create" Component={Writing} />
          <Route path="preview/:id" Component={PreviewArticle} />
          <Route path="update/:id" Component={UpdatePost} />
          <Route path="diary" Component={OverviewDiary} />
          <Route path="diary/create" Component={DearDigitalDairyForm} />
          <Route path="diary/preview/:id" Component={PreviewDairyItem} />
          <Route path="diary/update/:id" Component={UpdateDairyItem} />
          <Route path="users" Component={UsersPage} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
