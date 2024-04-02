import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetArticleWithIdUpdate, UpdateArticle } from "../services/Articles";
import Editor from "../components/Editor";
import Select from "react-select";
import { GetAllTags, getTag } from "../services/Tags";
import { GetAllCategories } from "../services/Categories";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");

  const navigate = useNavigate();

  const [tagsDef, setTagsDef] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetAllTags().then((result) => {
      setTags(result);
    });

    GetAllCategories().then((result) => {
      setCategories(result);
    });

    GetArticleWithIdUpdate(params.id).then(async (result) => {
      setTitle(result.title);
      setContent(result.content);
      setDescription(result.description);
      setAuthor(result.author);
      setSelectedCat(result.cat);
      //setSelectedTags(result.tags);
      const setDef = async (tagsSel) => {
        await tagsSel.forEach(async (tag) => {
          const tagResult = await getTag(tag);
          let newTags = [ ...tagsDef, tagResult ];
          setTagsDef(newTags);
        });
        setSelectedTags(tagsSel)
      };
      await setDef(result.tags);
      
      setImageAuthor(result.imageAuthor);
      setImageTitle(result.imageTitle);
    });

  }, [params.id]);

  async function handleSubmit() {
    const docId = params.id;

    toast.promise(
      UpdateArticle({
        title,
        content,
        description,
        author,
        cat: selectedCat,
        tags: selectedTags,
        image,
        imageTitle,
        imageAuthor,
        docId,
      })
        .then((result) => {
          navigate("/dashboard/overview");
        })
        .catch((err) => {
          console.log(err);
        }),
      {
        loading: "Posting ...",
        success: <b>Article posted!</b>,
        error: <b>Problem posting article</b>,
      }
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
        <label htmlFor="title">Title</label>
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
        <label htmlFor="editor">Content</label>
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
          required
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
          required
        />
        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          id="categories"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="py-1 px-2 rounded-sm border bg-right border-akimbo-dark-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
        >
          <option defaultChecked>-- Select category --</option>
          {categories.map((category) => (
            <option value={category.name}>{category.name}</option>
          ))}
        </select>
        <label htmlFor="tags">Tags</label>
        {tagsDef.length < 1 ? (
          "Loading..."
        ) : (
          <Select
            defaultValue={tagsDef}
            classNames={{
              control: () => "border border-solid bg-akimbo-light rounded-sm",
              container: () => "border border-solid bg-akimbo-light rounded-sm",
            }}
            isMulti
            options={tags}
            name="tags"
            onChange={(value) =>
              setSelectedTags(value.map((value) => value.value))
            }
            required
          />
        )}

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
          required
        />
        <label htmlFor="image_author">Image author</label>
        <input
          type="text"
          id="image_author"
          placeholder="Image author..."
          value={imageAuthor}
          onChange={(e) => setImageAuthor(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-fit bg-akimbo-dark-900 text-akimbo-light px-3 py-2"
        >
          Update article
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
