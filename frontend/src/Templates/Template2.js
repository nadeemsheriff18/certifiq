import React from 'react';

function Template2({ data }) {
  return (
    <div className="certificate-template">
      {data.map((student, index) => (
        <div className="certificate" key={index}>
          <h1>Certificate of Completion</h1>
          <p>Name: {student.Name}</p>
          <p>Roll Number: {student['Roll no']}</p>
          <p>Department: {student.Department}</p>
          <p>Year: {student.Year || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}

export default Template2;
