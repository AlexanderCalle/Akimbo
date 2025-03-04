import { useNavigate } from "react-router-dom";

const ArticleSection = ({ article, idx }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`w-full h-[40rem] lg:h-80 flex flex-col-reverse lg:${
        idx % 2 === 0 ? "flex-row-reverse" : "flex-row"
      } gap-4 items-center justify-center`}
    >
      <article
        className={`w-full lg:w-4/6 h-2/3 lg:h-4/5 flex flex-col p-2 z-10 items-center lg:items-${
          idx % 2 === 0 ? "start" : "end"
        } gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm`}
      >
        <div className={`flex flex-col gap-2`}>
          <div className={`flex gap-2 self-${
          idx % 2 === 0 ? "start" : "end"
        }`}>
            {article.tags.map((tag, idx) => (
              <p
                style={{
                  backgroundColor: tag.color + "10",
                  color: tag.color,
                }}
                key={idx}
                className={`w-fit px-3 py-1 text-sm bg-opacity-10`}
              >
                {tag.name}
              </p>
            ))}
          </div>
          <h3 className="text-md font-medium">{article.title}</h3>
          <p className="text-sm font-light">{article.author}</p>
        </div>
        <p
          className={`w-full h-40 overflow-hidden text-ellipsis text-center lg:text-${
            idx % 2 === 0 ? "start" : "end"
          }`}
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></p>
        <button
          className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light"
          onClick={() => {
            navigate(`/articles/${article.cat}/${article.id}`);
          }}
        >
          Further reading
        </button>
      </article>
      <img
        src={article.image}
        alt={article.imageTitle}
        className="w-4/6 lg:w-2/6 h-2/3 lg:h-full object-cover"
      />
    </section>
  );
};

export default ArticleSection;
