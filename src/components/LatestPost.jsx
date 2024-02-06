import { Link } from "react-router-dom";

const LatestPost = ({ article }) => {

  return (
    <div className="w-full md:w-10/12 mx-auto flex gap-6 group">
      <div className="opacity-0 group-hover:opacity-100 duration-300 flex absolute z-10 my-48 mx-5 md:mx-24 w-4/6 md:w-3/6 lg:w-2/6 h-auto p-5 flex-col gap-3 items-end bg-akimbo-light bg-opacity-70">
        <div className="flex gap-2">
          {article.tags.map((tag, idx) => (
            <p
              style={{
                backgroundColor: tag.color + "10",
                color: tag.color,
              }}
              className={`w-fit px-3 py-1 text-sm bg-opacity-10`}
              key={idx}
            >
              {tag.name}
            </p>
          ))}
          <h3 className="text-lg font-medium">Latest: {article.title}</h3>
        </div>
        <p
          className="text-end"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></p>
        <Link
          className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light"
          to={`/articles/${article.cat}/${article.id}`}
        >
          See more
        </Link>
      </div>
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-full h-[34rem] object-cover"
      />
    </div>
  );
};

export default LatestPost;
