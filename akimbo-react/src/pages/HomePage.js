import React from "react";
import MainLayout from "../layouts/MainLayout";
import Spotlight from "../components/Spotlight";
import RecentPosts from "../components/RecentPosts";

const HomePage = () => {
  return (
    <MainLayout>
      <Spotlight />
      <hr></hr>
      <RecentPosts />
      <hr />
    </MainLayout>
  );
};

export default HomePage;
