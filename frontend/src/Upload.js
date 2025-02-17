import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css'; // Import the stylesheet

function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setUploadStatus('File uploaded and certificates generated successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div className="upload-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="brand-name">CertifiQ</div>
        <div className="navbar-links">
          <a href="dashboard.html">Dashboard</a>
          <a href="profile.html">Profile</a>
        </div>
        <div className='logo'></div>
      </header>

      {/* Main Content */}
      <div className="upload-excel-container">
        <h2>Upload Excel File to Generate Certificates</h2>
        <div className="upload-area">
          <form onSubmit={handleSubmit} className="upload-form">
            <label htmlFor="excel-file" className="upload-area-label">
              <p>Drag & Drop your Excel file here, or click to select</p>
              <input
                type="file"
                id="excel-file"
                name="excel-file"
                accept=".xls, .xlsx"
                className="upload-input"
                onChange={handleFileChange}
              />
            </label>
            <button type="submit" className="upload-button">Upload and Generate Certificates</button>
          </form>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>

        {/* File Format Guidelines */}
        <div className="file-guidelines">
          <h3>File Format Guidelines</h3>
          <ul>
            <li>The Excel file should be in <code className="code">.xlsx</code> or <code className="code">.xls</code> format.</li>
            <li>Ensure the file contains the following columns: <strong>Name</strong>, <strong>Roll Number</strong>, <strong>Department</strong>, <strong>Year</strong>.</li>
            <li>Check for valid data and ensure there are no empty rows or columns.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
