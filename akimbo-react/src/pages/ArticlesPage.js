import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LatestPost from "../components/LatestPost";

const ArticlesPage = () => {
  const params = useParams();

  return (
    <MainLayout>
      <LatestPost />
    </MainLayout>
  );
};

export default ArticlesPage;
