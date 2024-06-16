import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OverviewArticle from "../Articles/OverviewArticle";
import ModalDelete from "../ModalDelete";
import { DeleteDairyItem, GetAllDiaryItems } from "../../services/Posts";
import OverviewDairyItem from "./OverviewDairyItem";
import Table from "../ui/TableComponent/Table";
import TableHead from "../ui/TableComponent/TableHead";
import TableBody from "../ui/TableComponent/TableBody";
import TableHeadItem from "../ui/TableComponent/TableHeadItem";
import Loader from "../ui/Loader";

const OverviewDairyItems = () => {

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetAllDiaryItems().then(async (result) => {
      setItems(result);
      setIsLoading(false);
    });
  }, []);

  // const filteredItems = useMemo(() => 
  //   items.filter(article => article.tags.find(e => e.name.includes(tagFilter)))
  // , [articles, tagFilter]);

  async function handleDelete() {
    DeleteDairyItem(articleToDelete.id)
      .then(result => {
        const newItems = items.filter(item => item.id !== articleToDelete.id);
        setItems(newItems);
        setShowModal(false);
        toast.success("Dairy item deleted!")
      }).catch(err => {
        toast.error("Error: something went wrong deleting dairy item");
        console.log(err);
      })
  //   DeleteArticle(articleToDelete.id)
  //     .then((result) => {
  //       const newArticles = articles.filter(
  //         (article) => article.id !== articleToDelete.id
  //       );
  //       setArticles(newArticles);
  //       setShowModal(false);
  //       toast.success("Article deleted");
  //     })
  //     .catch((err) => {
  //       toast.error("Error: something went wrong deleting article");
  //       console.log(err);
  //     });
  }

  const onDelete = (article) => {
    setArticleToDelete(article)
    setShowModal(true);
  }

  if (isLoading) {
      return (
        <Loader />
      );
  }

  return (
    <div className="flex flex-col gap-5">
        <div>
          <Table>
            <TableHead>
              <TableHeadItem name="Title" isSortable />
              <TableHeadItem name="Author" isSortable />
              <TableHeadItem name="Date" isSortable />
              <TableHeadItem name="Color" />
              <TableHeadItem />
            </TableHead>
            <TableBody>
              {items.map((article, index) => (
                <OverviewDairyItem
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

export default OverviewDairyItems