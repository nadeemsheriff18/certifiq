import React from 'react';

export default function Template3({ data, startIndex = 0, customStyles = {} }) {
  const {
    borderColor = '#2563eb', // Tailwind blue-600
    bgColor = '#f0f9ff',
    fontFamily = 'sans-serif',
  } = customStyles || {};

  return (
    <div className="p-4">
      {data.map((student, index) => (
        <div
          key={index}
          id={`certificate-${index + startIndex}`}
          className="relative w-[600px] h-[420px] mx-auto my-4 rounded-xl flex flex-col items-center justify-center p-4 shadow-lg"
          style={{
            border: `6px solid ${borderColor}`,
            backgroundColor: bgColor,
            fontFamily,
          }}
        >
          <div className="text-center mb-20">
            <h1 className="text-3xl font-extrabold text-blue-800">Achievement Award</h1>
            <p className="mt-2 text-base text-blue-700">Presented to</p>
            <h3 className="text-3xl mt-1 text-blue-600">{student.Name}</h3>
            <p className="mt-3 text-blue-800 text-sm max-w-[480px] mx-auto">
              For exceptional performance and contributions during the event.
            </p>
          </div>
          <div className="absolute bottom-10 flex justify-around w-4/5 text-center text-blue-900">
            <div>
              <div className="border-t-2 border-blue-500 w-40 mt-2"></div>
              <p className="font-bold mt-1">Coordinator</p>
            </div>
            <div>
              <div className="border-t-2 border-blue-500 w-40 mt-2"></div>
              <p className="font-bold mt-1">Director</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
