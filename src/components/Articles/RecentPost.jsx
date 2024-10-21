import { useNavigate } from "react-router-dom";
import { TYPE_ARTICLE } from "./RecentPosts";

const RecentPost = ({ article, idx }) => {
  const navigate = useNavigate();


  return (
    <section
      className={`w-full h-full lg:w-96 flex flex-col gap-4 items-start justify-start`}
    >
      <div className="self-start font-sans m-1 px-3 py-1 absolute bg-akimbo-light bg-opacity-70 lowercase">{article.type === TYPE_ARTICLE ? article.cat : article.type}</div>
      {article.image !== "" ? <img
        src={article.image}
        alt={article.imageTitle}
        className="w-full min-h-[150px] h-3/6 aspect-square object-cover bg-center"
      /> : <div className="w-full h-3/6 aspect-square object-cover bg-center" style={{backgroundColor: article.bg_color}} />}
      <article
        className={`h-full flex flex-col p-2 items-start gap-2 bg-akimbo-light bg-opacity-80 backdrop-blur-sm`}
      >
        <div className={`flex flex-col gap-2 items-start`}>
          <div className="flex gap-2 items-center h-7">
            {article.tags && (
              <>
                {article.tags.map((tag, idx) => (
                <p
                  style={{
                    backgroundColor: tag.color + "10",
                    color: tag.color,
                  }}
                  key={idx}
                  className={`w-fit h-full px-3 py-1 text-sm bg-opacity-10`}
                >
                  {tag.name}
                </p>
              ))}
              </>
            )}
          </div>
          <h3 className="text-md font-medium">{article.title}</h3>
          <p className="text-sm font-sans font-light"><span className="font-serif font-bold">by</span> {article.author}</p>
        </div>
        <p
          className={`flex-grow w-full max-h-48 text-ellipsis overflow-hidden  text-start`}
        >{article.description}</p>
        <button
          className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light"
          onClick={() => {
            navigate(article.type === TYPE_ARTICLE ? `/articles/${article.cat}/${article.id}` : `/diary/${article.id}`);
          }}
        >
          Further reading
        </button>
      </article>
    </section>
  );
};

export default RecentPost;
