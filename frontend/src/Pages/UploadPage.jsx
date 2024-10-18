import React, { useState } from "react";
import styled from "styled-components";

const UploadSection = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FileInput = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    alert("File uploaded!");
  };

  return (
    <UploadSection>
      <h1>Upload Documents</h1>
      <FileInput type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </UploadSection>
  );
};

export default UploadPage;
