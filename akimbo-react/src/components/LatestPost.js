import React from "react";
import { useParams } from "react-router-dom";

const LatestPost = () => {
  const params = useParams();

  return (
    <div className="w-10/12 mx-auto flex gap-6 ">
      <div className="absolute m-14">{params.type}</div>
      <img className="w-full h-[34rem] object-cover" />
    </div>
  );
};

export default LatestPost;
