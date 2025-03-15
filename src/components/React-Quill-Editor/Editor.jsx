import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import { modules } from "./quill-modules";
import VideoUploadDialog from "./video-upload-dialog";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/Firebase";
import toast from "react-hot-toast";
import CustomVideo from "./extensions/custom-video";

var Image = Quill.import('formats/image');

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('formats/video', CustomVideo);
Quill.register(Image, true);


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
  "image",
  "video",
  "alt",
  "height",
  "width",
  "style",
  "size"
];

const Editor = ({ content, setContent, placeholder }) => {
  const quillRef = React.useRef();
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const handleShowModal = () => {setShowVideoModal(true)}
  const quillModules = useMemo(() => modules(handleShowModal), []);

  const handleUpload = (file) => {
    var filename = file.name;  
    var currentdate = new Date();  
    var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();  
    filename = fileNamePredecessor + filename;  

    const storageRef = ref(storage, "articlesVideos/" + filename);

    toast.promise(uploadBytes(storageRef, file).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        const range = quillRef.current.getEditorSelection();
        // Write to quill
        quillRef.current.getEditor().insertEmbed(range.index ?? 0, 'video', url);
        quillRef.current.getEditor().setSelection(range.index ?? 0 + 1);
    
        quillRef.current.focus()
      }).catch(err => toast.error("Error: " + err.message));
    }), {
      loading: "Uploading video...",
      success: "Video uploaded!",
      error: "Error uploading video"
    });
  }

  return (
    <div>
      {showVideoModal && <VideoUploadDialog onClose={() => setShowVideoModal(false)} onUpload={handleUpload} />}
      <ReactQuill
        className="border border-solid bg-[#fff] h-max-96"
        theme="snow"
        onChange={setContent}
        value={content}
        modules={quillModules}
        formats={formats}
        ref={quillRef}
        placeholder={placeholder}
      />
    </div>
  );
};


export default Editor;
