import React, { useEffect, useState } from "react";
import Editor from "../../../components/React-Quill-Editor/Editor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {ChromePicker} from 'react-color';
import { isDairySlugUnique, PostDiaryItem } from "../../../services/Posts";
import { slugify } from "../../../utils/Article";

const DearDigitalDairyForm = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
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
    const [changeColor, setChangeColor] = useState('#999')
    const [displayPicker, setDisplayPicker] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
      setSlug(slugify(title));
    }, [title]);

    const onChangeColorPicker = color => {
        setColor(color.rgb);
        setChangeColor(color.hex);
    }
  
    async function handleSubmit() {
      const isSlugUnique = await isDairySlugUnique(slug);

      if (!isSlugUnique) {
        toast.error("Slug already exists");
        return;
      }
      toast.promise(
        PostDiaryItem({
          title,
          content,
          slug,
          description: description || "",
          author: author || "",
          image,
          image_title: imageTitle || "",
          image_author: imageAuthor || "",
          bg_color: changeColor,
          rgb_color: color
        }).then((result) => {
          navigate("/dashboard/overview");
        }),
        {
          loading: "Posting ...",
          success: <b>dairy post uploaded!</b>,
          error: <b>Problem posting diary post</b>,
        }
      );
    }

    return (
      <div className="flex flex-col gap-5 mx-auto w-4/6">
        <h2 className="text-2xl font-semibold underline">Post article</h2>
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
            className="px-3 py-1 border border-akimbo-dark-900"
            required
          />
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            name="slug"
            placeholder="Slug..."
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-3 py-1 border border-akimbo-dark-900"
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
            className="px-3 py-1 border border-akimbo-dark-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author fullname..."
            className="px-3 py-1 border border-akimbo-dark-900"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />   
          <label htmlFor="file_input">Upload image</label>
          <input
            className="block w-full text-sm bg-gray-50 border cursor-pointer text-akimbo-dark-900 border-akimbo-dark-900"
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
                        <div className="fixed top-0 right-0 bottom-0 left-0"  onClick={() => setDisplayPicker(false)}/>
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
            className="px-3 py-2 w-fit bg-akimbo-dark-900 text-akimbo-light"
          >
            Post article
          </button>
        </form>
      </div>
    );
}

export default DearDigitalDairyForm