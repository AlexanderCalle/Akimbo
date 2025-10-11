import React, { useEffect, useState } from "react";
import Editor from "../../../components/React-Quill-Editor/Editor";
import { createTag, GetAllTags } from "../../../services/Tags";
import { GetAllCategories } from "../../../services/Categories";
import { isArticleSlugUnique, PostArticle } from "../../../services/Articles";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SwitchButton from "../../../components/ui/switchButton";
import DatePicker from "../../../components/ui/DatePicker";
import SelectItems from "../../../components/ui/SelectItems";
import { slugify } from "../../../utils/Article";

const Writing = ({
  updateTitle = "",
  updateSlug = "",
  updateContent = "",
  updateDescription = "",
  updateAuthor = "",
  updateSelectedCat = "",
  updateSelectedTags = [],
  updateImage = null,
  updateImageTitle = "",
  updateImageAuthor = "",
  updateIsPublished = false,
  updateStartDate = ""
}) => {
  const [title, setTitle] = useState(updateTitle);
  const [slug, setSlug] = useState(updateSlug);
  const [content, setContent] = useState(updateContent);
  const [description, setDescription] = useState(updateDescription);
  const [author, setAuthor] = useState(updateAuthor);
  const [selectedCat, setSelectedCat] = useState(updateSelectedCat);
  const [selectedTags, setSelectedTags] = useState(updateSelectedTags);
  const [image, setImage] = useState(updateImage);
  const [imageTitle, setImageTitle] = useState(updateImageTitle);
  const [imageAuthor, setImageAuthor] = useState(updateImageAuthor);
  const [isPublished, setIsPublished] = useState(updateIsPublished);
  const [startDate, setStartDate] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [color, setColor] = useState("#999");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  useEffect(() => {
    GetAllTags().then((result) => {
      setTags(result);
    });

    GetAllCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  async function handleSubmit() {
    const isSlugUnique = await isArticleSlugUnique(slug);

    if (!isSlugUnique) {
      toast.error("Slug already exists");
      return;
    }

    toast.promise(
      PostArticle({
        title,
        slug,
        content,
        description,
        author,
        cat: selectedCat,
        tags: selectedTags,
        image,
        imageTitle,
        imageAuthor,
        isPublished,
        start_date: startDate ? startDate : null
      }).then((result) => {
        navigate("/dashboard/overview");
      }),
      {
        loading: "Posting ...",
        success: <b>Article posted!</b>,
        error: <b>Problem posting article</b>,
      }
    );
  };

  const handleCreate = async () => {
    try {
      await createTag(newTag, color);
      setIsModalOpen(false);
      GetAllTags().then((result) => {
        setTags(result);
      });
    } catch(error) {
      setErrorMessage(error.message)
    }
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
        <label htmlFor="title">Title</label>
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
          className="px-3 py-1 border border-akimbo-dark-900"
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
          className="px-3 py-1 border border-akimbo-dark-900"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          id="categories"
          onChange={(e) => setSelectedCat(e.target.value)}
          className="block px-2 py-1 w-full text-sm bg-right rounded-sm border border-akimbo-dark-900 focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected>-- Select category --</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category.name}>{category.name}</option>
          ))}
        </select>
        <label htmlFor="tags">Tags</label>
        <SelectItems 
          options={tags} 
          setSelected={setSelectedTags}
          handleCreate={handleCreate}
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          color={color}
          setColor={setColor}
          newTag={newTag}
          setNewTag={setNewTag}
         />
        <label htmlFor="file_input">Upload image</label>
        <input
          className="block w-full text-sm bg-gray-50 border cursor-pointer text-akimbo-dark-900 border-akimbo-dark-900"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
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
        <label htmlFor="start_date">Start date <span className="text-sm text-akimbo-dark-500">(not required)</span></label>
        <DatePicker setValue={setStartDate} />
        <SwitchButton name={"Publish?"} value={isPublished} setValue={setIsPublished} />
        <button
          type="submit"
          className="px-3 py-2 w-fit bg-akimbo-dark-900 text-akimbo-light"
        >
          Post article
        </button>
      </form>
    </div>
  );
};

export default Writing;
