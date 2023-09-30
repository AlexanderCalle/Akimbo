import React, { useEffect, useState } from "react";
import { GetAllArticles } from "../services/Articles";

const OverviewPosts = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    GetAllArticles().then(async (result) => {
      setArticles(result);
      console.log(result);
    });
  }, []);

  return (
    <>
      {articles.map((article, index) => (
        <section key={index}>
          <h3>{article.title}</h3>
          <p>{article.desc}</p>
          <p>{article.author}</p>
        </section>
      ))}
    </>
  );
};

export default OverviewPosts;
