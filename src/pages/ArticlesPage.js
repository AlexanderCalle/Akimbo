import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LatestPost from "../components/LatestPost";
import AllPosts from "../components/AllPosts";

const ArticlesPage = () => {
  const params = useParams();

  return (
    <MainLayout>
      <LatestPost />
      <AllPosts />
    </MainLayout>
  );
};

export default ArticlesPage;
