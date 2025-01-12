import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileList.css";

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/box/list");
        setFiles(response.data.split("\n"));
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="file-list-container">
      <h2>Uploaded Files</h2>
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index} className="file-item">
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
