import React from 'react';

export default function Template2({ data, startIndex = 0, customStyles = {} }) {
  const {
    borderColor = '#dc2626', // Tailwind red-600
    bgColor = '#fff1f2',
    fontFamily = 'monospace',
  } = customStyles || {};

  return (
    <div className="p-4">
      {data.map((student, index) => (
        <div
          key={index}
          id={`certificate-${index + startIndex}`}
          className="relative w-[600px] h-[420px] mx-auto my-4 rounded-lg flex flex-col items-center justify-center p-4 border-4"
          style={{
            border: `8px double ${borderColor}`,
            backgroundColor: bgColor,
            fontFamily,
          }}
        >
          <div className="text-center mb-20">
            <h1 className="text-3xl font-extrabold text-red-700">Honor Certificate</h1>
            <p className="mt-2 text-base text-red-600">Awarded to</p>
            <h3 className="text-3xl mt-1 text-red-800">{student.Name}</h3>
            <p className="mt-3 text-red-900 text-sm max-w-[500px] mx-auto">
              For your hard work, determination, and excellence throughout.
            </p>
          </div>
          <div className="absolute bottom-10 flex justify-around w-4/5 text-center text-red-800">
            <div>
              <div className="border-t-2 border-red-500 w-40 mt-2"></div>
              <p className="font-bold mt-1">Mentor</p>
            </div>
            <div>
              <div className="border-t-2 border-red-500 w-40 mt-2"></div>
              <p className="font-bold mt-1">Evaluator</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
