import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Allow only a single file to be dropped
  });

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file
      await axios.post('http://localhost:3005/api/file/addfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // After successful upload, fetch the uploaded file details
      const response = await axios.get('http://localhost:3005/api/file/latest'); // Replace with your actual endpoint to fetch the latest file
      setUploadedFile(response.data);

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {file ? (
          <>
            <p>Selected file: {file.name}</p>
            <img src={URL.createObjectURL(file)} alt="Selected file" style={imageStyles} />
          </>
        ) : isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select a file</p>
        )}
      </div>
      <button onClick={handleFileUpload} disabled={!file}>
        Upload File
      </button>

      {uploadedFile && (
        <div>
          <h2>Uploaded File Details</h2>
          <p>Original Name: {uploadedFile.originalname}</p>
          <img src={`http://localhost:3005/api/file/latest`} alt="Uploaded file" style={imageStyles} />
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '3px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  height: '100px',
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '100%',
  marginTop: '10px',
};

export default FileUploadComponent;
