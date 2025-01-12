import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/box/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully: " + response.data);
    } catch (err) {
      console.error(err);
      alert("File upload failed.");
    }
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleUpload} className="upload-button">
        Upload to Box
      </button>
    </div>
  );
};

export default FileUpload;
