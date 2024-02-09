import React from "react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import ImageResize from 'quill-image-resize-module-react';
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageResize', ImageResize);
var Image = Quill.import('formats/image');
Quill.register(Image, true);

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
 
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageUploader: {
    upload: file => {
      return new Promise((resolve, reject) => {
        var filename = file.name;  
        var currentdate = new Date();  
        var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();  
        filename = fileNamePredecessor + filename;  

        const storageRef = ref(storage, "articlesImages/" + filename);
        uploadBytes(storageRef, file).then(snapshot => {
          getDownloadURL(snapshot.ref).then(url => {
            console.log(url);
            resolve(url)
          }).catch(err => toast.error("Error: " + err.message));
        });
    })}
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
}

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

const Editor = ({ content, setContent, placeholder }) => {

  return (
    <div>
      <ReactQuill
        className="border border-solid bg-[#fff] h-max-96"
        theme="snow"
        onChange={setContent}
        value={content}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};


export default Editor;
