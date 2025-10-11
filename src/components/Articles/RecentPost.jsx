import { useNavigate } from "react-router-dom";
import { TYPE_ARTICLE } from "./RecentPosts";
import { category } from "../../utils/Article";

const RecentPost = ({ article, idx }) => {
  const navigate = useNavigate();

  return (
    <div className='overflow-hidden relative w-full max-w-sm'>
      <div className='absolute top-2 left-2 z-10 px-2 py-1 text-sm font-medium lowercase bg-opacity-80 bg-akimbo-light'>
        {article.type === TYPE_ARTICLE ? article.cat : article.type}
      </div>
      
      <div className='relative aspect-[16/9] w-full'>
        {article.image ? (
          <img
            src={article.image}
            alt={article.imageTitle}
            className='object-cover w-full h-full'
          />
        ) : (
          <div 
            className='w-full h-full' 
            style={{ backgroundColor: article.bg_color }} 
          />
        )}
      </div>

      <div className='flex flex-col h-[280px] p-4 bg-akimbo-light bg-opacity-90 backdrop-blur-sm'>
        <div className='flex-grow space-y-3'>
          {article.tags && article.tags.length > 0 ? (
            <div className='flex flex-wrap gap-1.5'>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: `${tag.color}10`,
                    color: tag.color,
                  }}
                  className='px-2 py-0.5 text-xs'
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ): (
            <div className='h-6' />
          )}

          <div className='space-y-1'>
            <h3 className='text-lg font-medium line-clamp-2'>{article.title}</h3>
            <p className='text-sm text-gray-700'>
              <span className='font-serif font-bold'>by</span> {article.author}
            </p>
          </div>

          <p className='text-sm text-gray-600 text-ellipsis line-clamp-3'>
            {article.description}
          </p>
        </div>

        <button
          onClick={() => {
            navigate(
              article.type === TYPE_ARTICLE 
                ? `/articles/${category(article.cat)}/${article.slug}` 
                : `/diary/${article.slug}`
            );
          }}
          className='px-4 py-2 mt-auto text-sm font-medium text-white transition-colors w-fit bg-akimbo-dark-900 hover:bg-akimbo-dark-500'
        >
          Further reading
        </button>
      </div>
    </div>
  );
};

export default RecentPost;
