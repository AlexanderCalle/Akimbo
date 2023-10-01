import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Overview from "./pages/Overview";
import Writing from "./pages/Writing";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route index Component={HomePage} />
        <Route path="aboutus" Component={AboutUsPage} />
        <Route path="articles/:type" Component={ArticlesPage} />
        <Route path="articles/:type/:articleId" Component={ArticlePage} />
        {/* Dashboard routes */}
        <Route path="login" Component={Login} />
        <Route
          path="dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        >
          <Route path="overview" Component={Overview} />
          <Route path="writing" Component={Writing} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
