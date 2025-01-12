import React, { useState } from 'react';
import axios from 'axios';

const BoxIntegration: React.FC = () => {
  const [folderId, setFolderId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState('');
  const [destination, setDestination] = useState('');
  const [folderItems, setFolderItems] = useState<string[]>([]);

  const handleFileUpload = async () => {
    if (!folderId || !file) {
      alert("Please provide a folder ID and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('folderId', folderId);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/box/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`File uploaded successfully. File ID: ${response.data}`);
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    }
  };

  const handleListFolderItems = async () => {
    if (!folderId) {
      alert("Please provide a folder ID.");
      return;
    }

    try {
      const response = await axios.get<string[]>(`http://localhost:8080/api/box/list/${folderId}`);
      setFolderItems(response.data);
      let data=response.data;
      console.log(data)
    } catch (error) {
      console.error(error);
      alert("Error listing folder items.");
    }
  };

  const handleDownloadFile = async () => {
    if (!fileId || !destination) {
      alert("Please provide a file ID and destination path.");
      return;
    }

    try {
      await axios.get(`http://localhost:8080/api/box/download/${fileId}`, {
        params: { destination },
        responseType: 'blob', // Handle file download
      });
      alert("File downloaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Error downloading file.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Box API Integration</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Upload File</h3>
        <input
          type="text"
          placeholder="Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>List Folder Items</h3>
        <input
          type="text"
          placeholder="Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />
        <button onClick={handleListFolderItems}>List Items</button>
        {folderItems.length > 0 && (
          <ul>
            {folderItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Download File</h3>
        <input
          type="text"
          placeholder="File ID"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination Path"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={handleDownloadFile}>Download</button>
      </div>
    </div>
  );
};

export default BoxIntegration;