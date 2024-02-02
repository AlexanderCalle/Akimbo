import React, { useEffect, useState } from "react";
import { getTag } from "../services/Tags";
import { useNavigate } from "react-router-dom";

const RecentPost = ({ article, idx }) => {
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
  }, [setTags, article.tags]);

  return (
    <section
      className={`w-full lg:w-96 h-96 lg:h-[50rem] flex flex-col gap-4 items-center justify-start`}
    >
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-full h-3/6 object-cover"
      />
      <article
        className={`w-full flex flex-col p-2 z-10 items-center gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm`}
      >
        <div className={`flex gap-2`}>
          {tags.map((tag, idx) => (
            <p
              style={{
                backgroundColor: tag.color + "10",
                color: tag.color,
              }}
              key={idx}
              className={`w-fit px-3 py-1 text-sm bg-opacity-10`}
            >
              {tag.name}
            </p>
          ))}
          <h3 className="text-lg font-medium">{article.title}</h3>
        </div>
        <p
          className={`w-full h-2/3 overflow-hidden text-ellipsis text-center lg:text-center`}
        >{article.description}</p>
        <button
          className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light"
          onClick={() => {
            navigate(`/articles/${article.cat}/${article.id}`);
          }}
        >
          See more
        </button>
      </article>
    </section>
  );
};

export default RecentPost;
