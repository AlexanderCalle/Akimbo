import React from "react";
import ArticleSection from "./ArticleSection";

const AllPosts = ({ articles }) => {
  return (
    <div className="w-full md:w-10/12 m-auto flex flex-col gap-4 my-4">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl self-center lg:self-start font-medium underline">
          All Posts
        </h2>
        <select
          id="tags"
          className="bg-akimbo-dark-900 text-akimbo-light px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected>Filter by tags</option>
          <option value="Architecture">Architecture</option>
          <option value="Art">Art</option>
          <option value="Books">Books</option>
          <option value="Essays">Essays</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {articles.map((article, idx) => (
          <ArticleSection key={idx} article={article} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
