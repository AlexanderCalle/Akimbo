import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route exact path="/" Component={HomePage} />
        <Route path="/aboutus" Component={AboutUsPage} />
      </Routes>
    </Router>
  );
};

export default App;
