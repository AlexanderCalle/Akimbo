import React, { useEffect, useState, useMemo } from "react";
import { DeleteArticle, GetAllArticles } from "../../services/Articles";
import toast from "react-hot-toast";
import OverviewArticle from "./OverviewArticle";
import ModalDelete from "../ModalDelete";
import { Link } from "react-router-dom";
import Table from "../ui/TableComponent/Table";
import TableHead from "../ui/TableComponent/TableHead";
import TableHeadItem from "../ui/TableComponent/TableHeadItem";
import TableBody from "../ui/TableComponent/TableBody";
import Loader from "../ui/Loader";


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
          <Loader />
        );
    }

    return (
        <div>
            <div className="w-full flex justify-between mb-5">
                <h2 className="text-2xl self-center lg:self-start font-medium underline">
                Overview Articles
                </h2>
                <div className="flex gap-2">
                  <Link 
                    className="px-3 py-1 bg-akimbo-dark-900 text-akimbo-light border-2 border-akimbo-dark-900 hover:bg-akimbo-dark-500" 
                    to={"/dashboard/articles/create"}
                  >
                    New Article
                    </Link>
                  <select
                      id="tags"
                      className="w-32 bg-akimbo-light px-3 py-1 text-md border-2 border-akimbo-dark-900 focus:ring-akimbo-dark-500 focus:border-akimbo-dark-500 cursor-pointer"
                      onChange={handleChange}
                  >
                      <option selected value="">Filter by tags</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Art">Art</option>
                      <option value="Books">Books</option>
                      <option value="Essays">Essays</option>
                  </select>
                </div>
            </div>

            <div className="mb-5">
                <Table>
                  <TableHead>
                    <TableHeadItem name="Title" isSortable={true} />
                    <TableHeadItem name="Category" isSortable={true} />
                    <TableHeadItem name="Author" isSortable={true} />
                    <TableHeadItem name="Description" />
                    <TableHeadItem name="Published" />
                    <TableHeadItem />
                </TableHead>
                <TableBody>
                  {filteredArticles.map((article, index) => (
                    <OverviewArticle
                      key={index}
                      article={article}
                      onDelete={onDelete}
                    />
                  ))}
                </TableBody>
              </Table>
              {showModal ? <ModalDelete article={articleToDelete} setShowModal={setShowModal} handleDelete={handleDelete} /> : null}
            </div>
        </div>
    )
}

export default OverviewArticles