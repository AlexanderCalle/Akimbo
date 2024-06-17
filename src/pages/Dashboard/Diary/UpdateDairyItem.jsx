import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../../../components/Editor";
import toast from "react-hot-toast";
import { ChromePicker} from 'react-color';
import { GetDairyItemById, UpdateDairyPostById } from "../../../services/Posts";

const UpdateDairyItem = () => {
    const params = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageAuthor, setImageAuthor] = useState('');

    const [color, setColor] = useState({
        r: "0",
        g: "9",
        b: "153",
        a: "1"
    });
    const [changeColor, setChangeColor] = useState()
    const [displayPicker, setDisplayPicker] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
      GetDairyItemById(params.id)
        .then(item =>  {
          setTitle(item.title);
          setContent(item.content);
          setDescription(item.description || '');
          setAuthor(item.author || '');
          setImageTitle(item.image_title || '');
          setImageAuthor(item.image_author || '');
          setColor(item.rgb_color);
          setChangeColor(item.bg_color);
          setIsLoading(false);
        }).catch(error => {
          toast.error("Something went wrong while fetching data");
          console.log(error);
          setIsLoading(false);
        });
    }, [params.id])

    const onChangeColorPicker = (color) => {
        setColor(color.rgb);
        setChangeColor(color.hex);
    }
  
    const handleSubmit = async () => {
      const docId = params.id;

      toast.promise(
        UpdateDairyPostById({
          title,
          content,
          description,
          author: author,
          image,
          image_title: imageTitle,
          image_author: imageAuthor,
          bg_color: changeColor,
          rgb_color: color,
          docId,
        })
          .then((result) => {
            navigate("/dashboard/overview");
          }).catch((err) => {
            console.log(err)
          }),
        {
          loading: "Posting ...",
          success: <b>dairy post updated!</b>,
          error: <b>Problem updating diary post</b>,
        }
      );
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
      <div className="w-4/6 mx-auto flex flex-col gap-5">
        <h2 className="text-2xl underline font-semibold">Post article</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="title">Title <span className="text-tag-red">*</span></label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-akimbo-dark-900 px-3 py-1"
            required
          />
          <label htmlFor="editor">Content <span className="text-tag-red">*</span></label>
          <Editor
            placeholder={"Write something..."}
            content={content}
            setContent={setContent}
          />
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            placeholder="Description..."
            className="border border-akimbo-dark-900 px-3 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author fullname..."
            className="border border-akimbo-dark-900 px-3 py-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />   
          <label htmlFor="file_input">Upload image</label>
          <input
            className="block w-full text-sm text-akimbo-dark-900 border border-akimbo-dark-900 cursor-pointer bg-gray-50"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <p
            class="-mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
          <label htmlFor="image_title">Image title</label>
          <input
            type="text"
            id="image_title"
            placeholder="Image title..."
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />
          <label htmlFor="image_author">Image author</label>
          <input
            type="text"
            id="image_author"
            placeholder="Image author..."
            value={imageAuthor}
            onChange={(e) => setImageAuthor(e.target.value)}
          />
            <label htmlFor="colorPicker">Background color</label>
           <div className="flex">
                <div className="w-10 h-10" style={{backgroundColor: changeColor}} />
                <input 
                    className="w-24 h-10"
                    name="color-txt"
                    type="text"
                    value={changeColor}
                    onClick={() => setDisplayPicker(true)}
                    id="colorPicker"
                    readOnly
                />
           </div>
            <div>
              {displayPicker && (
                <div className="absolute z-50">
                  <div className="fixed top-0 left-0 right-0 bottom-0"  onClick={() => setDisplayPicker(false)}/>
                  <ChromePicker color={color} onChange={onChangeColorPicker} />
                </div>
              )}
            </div>
            <p
                class="-mt-4 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
            >
                No idea? go to <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer">coolors.co</a>
            </p>
          <button
            type="submit"
            className="w-fit bg-akimbo-dark-900 text-akimbo-light px-3 py-2"
          >
            Update Dairy item
          </button>
        </form>
      </div>
    );
}

export default UpdateDairyItem