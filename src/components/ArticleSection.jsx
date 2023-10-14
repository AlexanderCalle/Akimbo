import React, { useEffect, useState } from "react";
import { getTag } from "../services/Tags";
import { useNavigate } from "react-router-dom";

const ArticleSection = ({ article, idx }) => {
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
    <section
      className={`w-full h-[34rem] lg:h-80 flex flex-col-reverse lg:${
        idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } gap-4 items-center justify-center`}
    >
      <article
        className={`w-full lg:w-4/6 h-2/5 lg:h-4/5 flex flex-col p-2 z-10 items-center lg:items-${
          idx % 2 === 0 ? "end" : "start"
        } gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm`}
      >
        <div className={`flex ${idx % 2 !== 0 && "flex-row-reverse"} gap-2`}>
          {tags.map((tag) => (
            <p
              className={`bg-[${tag.color}]  text-[${tag.color}] w-fit px-3 py-1 text-sm bg-opacity-10  `}
            >
              {tag.name}
            </p>
          ))}
          <h3 className="text-lg font-medium">{article.title}</h3>
        </div>
        <p
          className={`w-full h-2/3 overflow-hidden text-ellipsis text-center lg:text-${
            idx % 2 === 0 ? "end" : "start"
          }`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></p>
        <button
          className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light"
          onClick={() => {
            navigate(`/articles/${article.cat}/${article.id}`);
          }}
        >
          See more
        </button>
      </article>
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-4/6 lg:w-2/6 h-full object-cover"
      />
    </section>
  );
};

export default ArticleSection;
