import { storage } from "../../services/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { Quill } from "react-quill";

export const modules = (showModel, quillRef) => {
  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ];

  return {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        video: () => {
          showModel()
        },
      }
    },
   
    clipboard: {
      matchVisual: false,
    },

    keyboard: {
      bindings: {
        tab: false
      }
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
        })
      }
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  }
}