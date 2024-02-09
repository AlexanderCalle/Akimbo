import React from 'react'
import { useNavigate } from "react-router-dom";

const OverviewArticle = ({article, onDelete}) => {

    const navigate = useNavigate();

    const handlePreview = () => {
        navigate(`/dashboard/preview/${article.id}`);
    }

    const handleUpdate = () => {
        navigate("/dashboard/update/" + article.id);
    }

    const handleDelete = () => {
        onDelete(article)
    }

    return (
        <tr className='bg-akimbo-light border-b hover:bg-akimbo-dark-500 hover:bg-opacity-10 '>
            <td className="px-6 py-3">
                {article.title}
            </td>
            <td className="px-6 py-3">
                {article.cat}
            </td>
            <td className="px-6 py-3">
                {article.author}
            </td>
            <td className="px-6 py-3">
                {article.description}
            </td>
            <td className="px-6 py-3">
            <div className="flex items-center justify-center">
                     <button onClick={handlePreview}>
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
                     <button onClick={handleUpdate}>
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
                     onClick={handleDelete}
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
            </td>
        </tr>
        // <details className="p-1 cursor-pointer group">
        //     <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
        //         <h3 className="text-lg font-medium">{article.title}</h3>
        //         <span class="transition group-open:rotate-180">
        //             <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
        //             </svg>
        //         </span>
        //     </summary>
        //    <div className='flex flex-col gap-3 mt-3'>
        //         <p>{article.description}</p>
        //         {/* <p className='font-light' dangerouslySetInnerHTML={{ __html: article.content }}></p> */}
        //         <p className="font-thin">Created by {article.author}</p>
        //         <div className="flex items-center">
        //             <button onClick={handlePreview}>
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke-width="1.5"
        //                     stroke="currentColor"
        //                     class="w-6 h-6"
        //                 >
        //                     <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        //                     />
        //                     <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //                     />
        //                 </svg>
        //             </button>
        //             <button onClick={handleUpdate}>
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke-width="1.5"
        //                     stroke="currentColor"
        //                     class="w-6 h-6"
        //                 >
        //                     <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        //                     />
        //                 </svg>
        //             </button>
        //             <button
        //             onClick={handleDelete}
        //             >
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke-width="1.5"
        //                     stroke="currentColor"
        //                     class="w-6 h-6"
        //                 >
        //                     <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        //                     />
        //                 </svg>
        //             </button>
        //         </div>
        //    </div>
        // </details>
    )
}

export default OverviewArticle