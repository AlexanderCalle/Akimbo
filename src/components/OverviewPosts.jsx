import React, { useEffect, useState } from "react";
import { GetAllArticles } from "../services/Articles";

const OverviewPosts = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    GetAllArticles().then((result) => {
      setArticles(result);
      console.log(result);
    });
  }, []);

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <>
      {articles.map((article) => (
        <section>
          <h3>{article.title}</h3>
          <p>{article.desc}</p>
          <p>{article.author.firstname}</p>
        </section>
      ))}
    </>
  );
};

export default OverviewPosts;
