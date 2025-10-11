import { Link } from "react-router-dom";
import { category } from "../../utils/Article";

const LatestPost = ({ article }) => {

  return (
    <div className="flex gap-6 mx-auto w-full md:w-10/12">
      <div className="flex absolute z-10 flex-col gap-3 items-start p-5 mx-5 my-48 w-4/6 h-auto max-h-72 bg-opacity-70 md:mx-24 md:w-3/6 lg:w-2/6 bg-akimbo-light">
        <div className="flex flex-col gap">
          <h3 className="text-lg font-medium">Latest: {article.title}</h3>
          <p className="text-sm font-light">{article.author}</p>
        </div>
        <p
          className="overflow-hidden text-end text-ellipsis"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></p>
        <Link
          className="px-3 py-2 font-sans bg-akimbo-dark-900 text-akimbo-light"
          to={`/articles/${category(article.cat)}/${article.slug}`}
        >
          Further reading
        </Link>
      </div>
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-full h-[34rem] object-cover bg-center"
      />
    </div>
  );
};

export default LatestPost;
