import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { GetAllTags } from "../services/Tags";
import { GetAllCategories } from "../services/Categories";
import Select from "react-select";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedTags, setSelectedTags] = [];

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetAllTags().then((result) => {
      setTags(result);
    });

    GetAllCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <div className="w-4/6 mx-auto flex flex-col gap-5">
      <h2>Post article</h2>
      <section className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-solid px-3 py-1 bg-akimbo-light"
        />
        <label htmlFor="editor">Content</label>
        <Editor
          placeholder={"Write something..."}
          content={content}
          setContent={setContent}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Author fullname..."
          className="border border-solid px-3 py-1 bg-akimbo-light"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          id="categories"
          className="bg-akimbo-light px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 focus:rounded-none"
        >
          <option selected>-- Select a category --</option>
          {categories.map((category) => (
            <option value={category.catRef}>{category.name}</option>
          ))}
        </select>
        <label htmlFor="tags">Tags</label>
        <Select isMulti options={tags} name="tags" onChange={setSelectedTags} />
      </section>
    </div>
  );
};

export default Writing;
