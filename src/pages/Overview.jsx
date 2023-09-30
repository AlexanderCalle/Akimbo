import React, { Suspense } from "react";
import OverviewPosts from "../components/OverviewPosts";

const Overview = () => {
  return (
    <>
      <h2>Overview</h2>
      <Suspense fallback={<Loading />}>
        <OverviewPosts />
      </Suspense>
    </>
  );
};

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default Overview;
