import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CertificatePreview() {
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    // Fetch certificate preview (this would usually fetch generated certificates from backend)
    axios.get('http://localhost:5000/preview')
      .then(response => {
        setCertificateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching preview:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Certificate Preview</h2>
      {certificateData ? (
        <div className="certificate-preview">
          <img src={certificateData.url} alt="Certificate Preview" />
        </div>
      ) : (
        <p>No certificate preview available.</p>
      )}
    </div>
  );
}

export default CertificatePreview;
