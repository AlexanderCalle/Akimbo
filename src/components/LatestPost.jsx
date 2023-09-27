import React from "react";
import { useParams, Link } from "react-router-dom";
import ArticlesEssaysImage from "../assets/ArtlicesAndEssays.jpg";
import Tag from "./Tag";

const LatestPost = () => {
  const params = useParams();

  return (
    <div className="w-full md:w-10/12 mx-auto flex gap-6 ">
      <div className="absolute z-10 my-48 mx-5 md:mx-24 w-4/6 md:w-3/6 lg:w-2/6 h-auto p-5 flex flex-col gap-3 items-end bg-akimbo-light opacity-90 backdrop-blur-lg">
        <div className="flex gap-2">
          <Tag TagName={"Architecture"} Color={"purple"} />
          <h3 className="text-lg font-medium">Latest: Title</h3>
        </div>
        <p className="text-end">
          orem ipsum dolor sit amet, consectetur adipiscing elit. Nam id orci
          sit amet turpis fringilla vehicula sit amet a tortor. Nunc vestibulum
          risus vitae sem pretium, at porta nisl eleifend.
        </p>
        <Link
          className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light"
          to={`/articles/${params.type}/001`}
        >
          See more
        </Link>
      </div>
      <img
        src={ArticlesEssaysImage}
        alt="latest post"
        className="w-full h-[34rem] object-cover"
      />
    </div>
  );
};

export default LatestPost;
