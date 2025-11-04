import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetArticleWithIdUpdate, isArticleSlugUnique, UpdateArticle } from "../../../services/Articles";
import Editor from "../../../components/React-Quill-Editor/Editor";
import { GetAllTags } from "../../../services/Tags";
import { GetAllCategories } from "../../../services/Categories";
import toast from "react-hot-toast";
import SwitchButton from "../../../components/ui/switchButton";
import DatePicker from "../../../components/ui/DatePicker";
import SelectItems from "../../../components/ui/SelectItems";
import { slugify } from "../../../utils/Article";

const UpdatePost = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [prevSlug, setPrevSlug] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [startDate, setStartDate] = useState()

  const navigate = useNavigate();

  const [tagsDef, setTagsDef] = useState([]);
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

    GetArticleWithIdUpdate(params.id).then(async (result) => {
      setTitle(result.title);
      setContent(result.content);
      setDescription(result.description);
      setAuthor(result.author);
      setSelectedCat(result.cat);
      setSlug(result.slug);
      setPrevSlug(result.slug);
      //setSelectedTags(result.tags);

      const setDef = async (tagsSel) => {
        setTagsDef(tagsSel);
        setSelectedTags(tagsSel.map(tag => tag.value))
      };

      setDef(await result.tags);
      
      setImageAuthor(result.imageAuthor);
      setImageTitle(result.imageTitle);
      setStartDate(result.start_date?.toDate())
      setIsPublished(result.isPublished);
    });

  }, [params.id]);

  async function handleSubmit() {
    const docId = params.id;

    const isSlugUnique = await isArticleSlugUnique(slug);

    if (!isSlugUnique && slug !== prevSlug) {
      toast.error("Slug already exists");
      return;
    }

    toast.promise(
      UpdateArticle({
        title,
        content,
        description,
        author,
        cat: selectedCat,
        tags: selectedTags,
        image,
        slug,
        imageTitle,
        imageAuthor,
        isPublished,
        start_date: startDate ? startDate : null,
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
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="block px-2 py-1 w-full text-sm bg-right rounded-sm border border-akimbo-dark-900 focus:ring-blue-500 focus:border-blue-500"
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
         <SelectItems
          options={tags}
          selectedValues={tagsDef}
          setSelected={setSelectedTags}
         />
        )}

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
          SVG, PNG, JPG or GIF (MAX. 800x400px). <br />
          (Not required when updating, image will be old image)
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
        <DatePicker value={startDate} setValue={setStartDate} />
        <SwitchButton name={"Publish?"} value={isPublished} setValue={setIsPublished} />
        <button
          type="submit"
          className="px-3 py-2 w-fit bg-akimbo-dark-900 text-akimbo-light"
        >
          Update article
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
