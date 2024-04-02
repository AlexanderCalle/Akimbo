import React, { useEffect, useState, useMemo } from "react";
import { DeleteArticle, GetAllArticles } from "../../services/Articles";
import toast from "react-hot-toast";
import OverviewArticle from "./OverviewArticle";
import ModalDelete from "../ModalDelete";


const OverviewArticles = () => {

    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [tagFilter, setTagFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      GetAllArticles().then(async (result) => {
        setArticles(result);
        setIsLoading(false);
      });
    }, []);
  
    const filteredArticles = useMemo(() => 
      articles.filter(article => article.tags.find(e => e.name.includes(tagFilter)))
    , [articles, tagFilter]);
  
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
          toast.error("Error: something went wrong deleting article");
          console.log(err);
        });
    }
  
    const onDelete = (article) => {
      setArticleToDelete(article)
      setShowModal(true);
    }
  
    const handleChange = (e) => {
      setTagFilter(e.target.value);
    }

    if (isLoading) {
        return (
          <div
            className="w-full my-20 flex flex-col items-center gap-2"
            role="status"
          >
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-akimbo-dark-900"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        );
    }

    return (
        <div>
            <div className="w-full flex justify-between mb-5">
                <h2 className="text-2xl self-center lg:self-start font-medium underline">
                Overview Posts
                </h2>
                <select
                    id="tags"
                    className="w-32 bg-akimbo-light px-3 py-2 text-md border-2 border-akimbo-dark-900 focus:ring-akimbo-dark-500 focus:border-akimbo-dark-500 cursor-pointer"
                    onChange={handleChange}
                >
                    <option selected value="">Filter by tags</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Art">Art</option>
                    <option value="Books">Books</option>
                    <option value="Essays">Essays</option>
                </select>
            </div>

            <div className="mb-5">
                <table className="w-full text-sm text-left rtl:text-right text-akimbo-dark-500 border border-akimbo-dark-900">
                <thead className="text-gray-700 bg-akimbo-dark-500 bg-opacity-10 border-b border-akimbo-dark-200">
                    <tr>
                    <th scope="col" className="px-6 py-5">
                        <div class="flex items-center">
                        Title
                        <a href="#">
                            <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg>
                        </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-5">
                    <div class="flex items-center">
                        Category
                        <a href="#">
                            <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg>
                        </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-5">
                    <div class="flex items-center">
                        Author
                        <a href="#">
                            <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg>
                        </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-5">Description</th>
                    <th scope="col" className="px-6 py-5"></th>
                    </tr>
                </thead>
                <tbody>
                {filteredArticles.map((article, index) => (
                    <OverviewArticle
                    key={index}
                    article={article}
                    onDelete={onDelete}
                    />
                ))}
                
                </tbody>
                </table>
                {showModal ? <ModalDelete article={articleToDelete} setShowModal={setShowModal} handleDelete={handleDelete} /> : null}
            </div>
        </div>
    )
}

export default OverviewArticles