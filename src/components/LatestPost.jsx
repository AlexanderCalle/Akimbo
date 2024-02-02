import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getTag } from "../services/Tags";

const LatestPost = ({ article }) => {
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const setDef = async (tagsSel) => {
      await tagsSel.forEach(async (tag) => {
        const tagResult = await getTag(tag);
        setTags([...tags, tagResult]);
      });
    };
    setDef(article.tags);
  }, []);

  return (
    <div className="w-full md:w-10/12 mx-auto flex gap-6 ">
      <div className="absolute z-10 my-48 mx-5 md:mx-24 w-4/6 md:w-3/6 lg:w-2/6 h-auto p-5 flex flex-col gap-3 items-end bg-akimbo-light opacity-90 backdrop-blur-lg">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <p
              style={{
                backgroundColor: tag.color + "10",
                color: tag.color,
              }}
              className={`w-fit px-3 py-1 text-sm bg-opacity-10`}
            >
              {tag.name}
            </p>
          ))}
          <h3 className="text-lg font-medium">Latest: {article.title}</h3>
        </div>
        <p
          className="text-end"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></p>
        <Link
          className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light"
          to={`/articles/${article.cat}/${article.id}`}
        >
          See more
        </Link>
      </div>
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-full h-[34rem] object-cover"
      />
    </div>
  );
};

export default LatestPost;
