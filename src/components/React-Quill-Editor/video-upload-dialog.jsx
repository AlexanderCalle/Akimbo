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
    <div className="flex fixed top-0 right-0 bottom-0 left-0 z-10 justify-center items-center bg-opacity-50 bg-akimbo-dark-900">
      <div className="z-20 p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-lg font-bold">Upload Video</h2>
        <input
          type="file"
          accept="video/*"
          className="p-2 mb-4 w-full rounded-lg border border-gray-300"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex justify-end">
        <button
          className="px-4 py-2 mr-2 text-akimbo-dark-500"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white bg-akimbo-dark-900"
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