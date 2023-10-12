import React, { useEffect, useState } from "react";
import { DeleteArticle, GetAllArticles } from "../services/Articles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OverviewPosts = () => {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    GetAllArticles().then(async (result) => {
      setArticles(result);
    });
  }, []);

  async function handleDelete() {
    DeleteArticle(articleToDelete.id)
      .then((result) => {
        const newArticles = articles.filter(
          (article) => article.id !== articleToDelete.id
        );
        setArticles(newArticles);
        setShowModal(false);
        toast.success("Article deleted");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-3 gap-2">
      {articles.map((article, index) => (
        <section
          key={index}
          className="border border-solid border-akimbo-dark-900 p-2"
        >
          <div className="flex justify-between">
            <h3 className="text-2xl font-medium">{article.title}</h3>
            <div className="flex items-center">
              <button
                onClick={() => {
                  navigate(`/dashboard/preview/${article.id}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard/update/" + article.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setArticleToDelete(article);
                  setShowModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p>{article.description}</p>
          <p className="font-light">Created by {article.author}</p>
        </section>
      ))}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-akimbo-dark-500">
                  <h3 className="text-3xl font-semibold">Delete article?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-[#000] opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure you want to delete {articleToDelete.title}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-akimbo-dark-500">
                  <button
                    className="bg-tag-red text-akimbo-light  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-akimbo-dark-500 text-white text-sm px-6 py-2 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-[#000]"></div>
        </>
      ) : null}
    </div>
  );
};

export default OverviewPosts;
