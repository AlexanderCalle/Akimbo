import React, { useMemo, useState, useEffect } from "react";
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
import "./formats"

// Add custom toolbar icon styles
const toolbarStyles = `
  .ql-editor {
    min-height: 200px;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = toolbarStyles;
document.head.appendChild(styleSheet);

var Image = Quill.import('formats/image');
const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

// Custom clipboard handler
class CustomClipboard extends Clipboard {
  convert(html = null) {
    if (html) {
      // Check for iframe in HTML
      if (html.includes('<iframe')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const iframe = tempDiv.querySelector('iframe');
        if (iframe) {
          const src = iframe.getAttribute('src');
          const width = iframe.getAttribute('width') || '100%';
          const height = iframe.getAttribute('height') || '352';
          const style = iframe.getAttribute('style') || '';
          const allow = iframe.getAttribute('allow') || '';
          
          if (src) {
            return new Delta().insert({
              iframe: {
                src,
                width,
                height,
                style,
                allow
              }
            });
          }
        }
      }
      // Check for iframe URL in plain text
      if (html.startsWith('http') && (html.includes('spotify.com/embed') || html.includes('youtube.com/embed'))) {
        return new Delta().insert({
          iframe: {
            src: html,
            width: '100%',
            height: '352'
          }
        });
      }
    }
    return super.convert(html);
  }
}

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/clipboard', CustomClipboard, true);
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
  "iframe",
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
  const quillModules = useMemo(() => modules(handleShowModal, quillRef), [quillRef]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      
      const handlePaste = (e) => {
        const clipboardData = e.clipboardData;
        if (!clipboardData) return;

        // Try to get HTML content first
        let html = clipboardData.getData('text/html');
        let text = clipboardData.getData('text/plain');

        console.log('Paste event triggered:', { html, text });

        // If we have HTML content
        if (html) {
          // Check if it's an iframe
          if (html.includes('<iframe')) {
            e.preventDefault();
            e.stopPropagation();
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const iframe = tempDiv.querySelector('iframe');
            
            if (iframe) {
              const src = iframe.getAttribute('src');
              const width = iframe.getAttribute('width') || '100%';
              const height = iframe.getAttribute('height') || '352';
              const style = iframe.getAttribute('style') || '';
              const allow = iframe.getAttribute('allow') || '';
              
              console.log('Found iframe:', { src, width, height, style, allow });
              
              if (src) {
                try {
                  const range = editor.getSelection(true);
                  console.log('Inserting iframe at range:', range);
                  
                  // Create a new Delta with the iframe
                  const delta = new Delta()
                    .retain(range.index)
                    .insert({ iframe: { src, width, height, style, allow } });
                  
                  // Apply the delta
                  editor.updateContents(delta);
                  editor.setSelection(range.index + 1);
                  console.log('Iframe inserted successfully');
                  return;
                } catch (error) {
                  console.error('Error inserting iframe:', error);
                }
              }
            }
          }
        }
        
        // If we have plain text that looks like an iframe URL
        if (text && text.startsWith('http') && (text.includes('spotify.com/embed') || text.includes('youtube.com/embed'))) {
          e.preventDefault();
          e.stopPropagation();
          
          try {
            const range = editor.getSelection(true);
            console.log('Inserting iframe URL at range:', range);
            
            const delta = new Delta()
              .retain(range.index)
              .insert({ iframe: { src: text, width: '100%', height: '352' } });
            
            editor.updateContents(delta);
            editor.setSelection(range.index + 1);
            console.log('Iframe URL inserted successfully');
            return;
          } catch (error) {
            console.error('Error inserting iframe URL:', error);
          }
        }

        // If the content is raw HTML (not wrapped in a tag)
        if (text && text.includes('<iframe')) {
          e.preventDefault();
          e.stopPropagation();
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = text;
          const iframe = tempDiv.querySelector('iframe');
          
          if (iframe) {
            const src = iframe.getAttribute('src');
            const width = iframe.getAttribute('width') || '100%';
            const height = iframe.getAttribute('height') || '352';
            const style = iframe.getAttribute('style') || '';
            const allow = iframe.getAttribute('allow') || '';
            
            console.log('Found raw iframe:', { src, width, height, style, allow });
            
            if (src) {
              try {
                const range = editor.getSelection(true);
                console.log('Inserting raw iframe at range:', range);
                
                const delta = new Delta()
                  .retain(range.index)
                  .insert({ iframe: { src, width, height, style, allow } });
                
                editor.updateContents(delta);
                editor.setSelection(range.index + 1);
                console.log('Raw iframe inserted successfully');
                return;
              } catch (error) {
                console.error('Error inserting raw iframe:', error);
              }
            }
          }
        }
      };

      editor.root.addEventListener('paste', handlePaste, true);
      return () => {
        editor.root.removeEventListener('paste', handlePaste, true);
      };
    }
  }, []);

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
    <div className="quill-editor-container">
      {showVideoModal && <VideoUploadDialog onClose={() => setShowVideoModal(false)} onUpload={handleUpload} />}
      <ReactQuill
        className="border border-solid bg-[#fff]"
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
