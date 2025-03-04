import MainLayout from '../layouts/MainLayout'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDairyItemById } from "../services/Posts";
import contrast from "../utils/Contrast";

const DiaryItemPage = () => {

    const params = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInverted, setIsInverted] = useState(false);
  
    useEffect(() => {
      GetDairyItemById(params.id).then((result) => {
        setItem(result);
        const rgb = [result.rgb_color.r, result.rgb_color.g, result.rgb_color.b];
        const contrastRatio = contrast(rgb);
        setIsInverted(contrastRatio > 7 ? true : false);
        setLoading(false);
      });


    }, [params.id]);
  
    if (loading) {
      return (
        <div className="mx-auto" role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    <MainLayout>
         <div className="w-full lg:w-10/12 mx-auto flex flex-col items-center gap-6">
            {item.image !== "" ? (
                <>
                    <img
                        src={item.image}
                        alt="item"
                        className="w-full h-96 object-cover"
                    />
                    <h2 className="w-fit self-start bg-akimbo-light bg-opacity-80 backdrop-blur-sm text-3xl px-3 py-2 ml-6 lg:ml-16 -mt-12">
                        {item.title}
                    </h2>
                </>
            ): <h2 className="mt-24 w-fit bg-akimbo-light bg-opacity-80 backdrop-blur-sm text-3xl px-3 py-2">
                    {item.title}
                </h2>}
            
            <div className="w-5/6 md:w-4/6 flex flex-col gap-4 p-2" style={{backgroundColor: item.bg_color}}>
                <p className={`text-sm font-light text-akimbo-dark-900 ${isInverted && "invert"}`}>
                    {item.created_date.toDate().toDateString()}
                </p>
                <p
                className={`${isInverted && "[&_*:not(image)]:invert"}`}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
            </div>
        </div>
    </MainLayout>
  )
}

export default DiaryItemPage