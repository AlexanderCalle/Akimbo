import { useState } from "react";

const VideoUploadDialog = ({ onClose, onUpload }) => {

  const [file, setFile] = useState(null);
  const handleUpload = () => {
    if (file) {
      onUpload(file);
      onClose();
    }
  };
  

  return (
    <div className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-akimbo-dark-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white z-20 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Upload Video</h2>
        <input
          type="file"
          accept="video/*"
          className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex justify-end">
        <button
          className="text-akimbo-dark-500 px-4 py-2 mr-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-akimbo-dark-900 text-white px-4 py-2"
          onClick={handleUpload}
        >
          Upload
        </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadDialog;