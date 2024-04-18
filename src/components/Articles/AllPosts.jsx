import React, {useMemo, useState} from "react";
import ArticleSection from "./ArticleSection";
import SelectTag from "../SelectTag";

const AllPosts = ({ articles, tags }) => {

  const [tagType, setTagType] = useState("");

  const filteredArticles = useMemo(() => 
    articles.filter(article => article.tags.find(e => e.name.includes(tagType)))
  , [articles, tagType]);

  const handleChange = (value) => {
    setTagType(value);
  }

  return (
    <div className="w-full md:w-10/12 m-auto flex flex-col gap-4 px-4 my-4">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl self-center lg:self-start font-medium underline">
          All Posts
        </h2>
        <SelectTag handleChange={handleChange} tags={tags} />
      </div>
      <div className="flex flex-col gap-2">
        {filteredArticles.map((article, idx) => (
          <ArticleSection key={idx} article={article} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
