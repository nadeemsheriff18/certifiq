import React from 'react';
import html2canvas from 'html2canvas';
import '../Upload.css';

function Template1({ data }) {

  const generateImage = (index) => {
    const certificate = document.getElementById(`certificate-${index}`);

    html2canvas(certificate).then((canvas) => {
      // Convert the canvas to an image
      const img = canvas.toDataURL('image/png'); // or 'image/jpeg'

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = img;
      link.download = `certificate_${index}.png`; // You can customize the file name
      link.click();
    });
  };

  return (
    <div className="certificate-template">
      {data.map((student, index) => (
        <div className="certificate" key={index} id={`certificate-${index}`}>
          <h1>Certificate of Completion</h1>
          <p>Name: {student.Name}</p>
          <p>Roll Number: {student['Roll no']}</p>
          <p>Department: {student.Department}</p>
          <p>Year: {student.Year || 'N/A'}</p>
          
          {/* Button to generate and download image */}
          <button onClick={() => generateImage(index)}>Download Certificate</button>
        </div>
      ))}
    </div>
  );
}

export default Template1;
