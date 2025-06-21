import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import Template3 from './Templates/Template3';
import Template4 from './Templates/Template4';
import html2canvas from 'html2canvas';
import { Link, useLocation } from 'react-router-dom';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [certificatesData, setCertificatesData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customStyles, setCustomStyles] = useState(null);

  const location = useLocation();
  const { customizedStyles, certificateData: navData, selectedTemplate: navTemplate } = location.state || {};

  useEffect(() => {
    if (navData) setCertificatesData(navData);
    if (navTemplate) setSelectedTemplate(navTemplate);
    if (customizedStyles) setCustomStyles(customizedStyles);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { certificates_data } = response.data;
      setCertificatesData(certificates_data);
      setUploadStatus('File uploaded successfully. Now choose a template.');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const downloadAllCertificates = async () => {
    for (let index = 0; index < certificatesData.length; index++) {
      const certElem = document.getElementById(`certificate-${index}`);
      if (certElem) {
        await new Promise((resolve) => {
          setTimeout(() => {
            html2canvas(certElem, { scale: 2 }).then((canvas) => {
              const link = document.createElement('a');
              link.href = canvas.toDataURL('image/png');
              link.download = `certificate_${index + 1}.png`;
              link.click();
              resolve();
            });
          }, 300);
        });
      }
    }
  };

let TemplateComponent;
if (selectedTemplate === 'template1') {
  TemplateComponent = Template1;
} else if (selectedTemplate === 'template2') {
  TemplateComponent = Template2;
} else if (selectedTemplate === 'template3') {
  TemplateComponent = Template3;
} else if (selectedTemplate === 'template4') {
  TemplateComponent = Template4;
} else {
  TemplateComponent = null; // Or a fallback component if desired
}

  return (
    <div className="text-white font-sans">
      <header className="bg-white text-black py-4 px-8 shadow-md">
        <Link to="/">
          <div className="text-3xl font-serif">CertifiQ</div>
        </Link>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center font-sans">Upload Participant Excel</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md text-black">
          <label htmlFor="excel-file" className="block font-medium mb-2">
            Upload Excel File
          </label>
          <input
            type="file"
            id="excel-file"
            accept=".xls, .xlsx"
            onChange={handleFileChange}
            className="block w-full mb-4 border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Generate Certificates
          </button>
          {uploadStatus && <p className="mt-4 text-sm text-black">{uploadStatus}</p>}
        </form>

        {certificatesData.length > 0 && (
          <div className="mt-10">
            <label className="block text-lg font-semibold mb-2 ">Select a Template</label>
            <select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              className="w-full p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-300 border-2"
            >
              <option value="">Select Template</option>
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              <option value="template3">Template 3</option>
              <option value="template4">Template 4</option>

            </select>
          </div>
        )}

        {certificatesData.length > 0 && selectedTemplate && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Preview</h3>
            <TemplateComponent data={[certificatesData[0]]} startIndex={0} customStyles={customStyles} />

            <div className="absolute top-0 left-0 opacity-0 pointer-events-none z-[-1]">
              <TemplateComponent
                data={certificatesData.slice(1)}
                startIndex={1}
                customStyles={customStyles}
              />
            </div>

            <Link
              to="/edit"
              state={{
                selectedTemplate,
                certificateData: certificatesData[0],
                fullData: certificatesData,
              }}
            >
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg mx-4">
                Edit
              </button>
            </Link>

            <button
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-lg mx-4"
              onClick={downloadAllCertificates}
            >
              Download All Certificates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadForm;
