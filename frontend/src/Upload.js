import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css'; // Import the stylesheet
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [certificatesData, setCertificatesData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
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

      const { certificates_data } = response.data;
      setCertificatesData(certificates_data);
      setUploadStatus('File uploaded successfully. Certificates will be generated.');
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
      </header>

      {/* Main Content */}
      <div className="upload-excel-container">
        <h2>Upload Excel File to Generate Certificates</h2>

        {/* Template Selection */}
        <div className="template-selection">
          <h3>Select a Template</h3>
          <select
            name="template"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            <option value="">Select Template</option>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
          </select>
        </div>

        {/* Upload Excel */}
        {selectedTemplate && (
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
              <button type="submit" className="upload-button">
                Upload and Generate Certificates
              </button>
            </form>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
          </div>
        )}

        {/* Display the first certificate using the selected template */}
<div className="generated-certificates">
  {certificatesData.length > 0 && selectedTemplate && (
    selectedTemplate === 'template1' ? (
      <Template1 data={[certificatesData[0]]} /> // Pass only the first certificate
    ) : selectedTemplate === 'template2' ? (
      <Template2 data={[certificatesData[0]]} /> // Pass only the first certificate
    ) : null
  )}
</div>

        </div>
      </div>
    
  );
}

export default UploadForm;
