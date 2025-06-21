import React from 'react';

export default function Template4({ data, startIndex = 0, customStyles = {} }) {
  const {
    borderColor = '#10b981', // Tailwind green-500
    bgColor = '#ecfdf5',
    fontFamily = 'cursive',
  } = customStyles || {};

  return (
    <div className="p-4">
      {data.map((student, index) => (
        <div
          key={index}
          id={`certificate-${index + startIndex}`}
          className="relative w-[600px] h-[420px] mx-auto my-4 rounded-2xl flex flex-col items-center justify-center p-4"
          style={{
            border: `10px dashed ${borderColor}`,
            backgroundColor: bgColor,
            fontFamily,
          }}
        >
          <div className="text-center mb-20">
            <h1 className="text-3xl font-bold text-green-700">Certificate of Recognition</h1>
            <p className="mt-2 text-base font-semibold text-green-600">
              Presented proudly to
            </p>
            <h3 className="text-3xl mt-1 text-green-800">{student.Name}</h3>
            <p className="mt-3 text-green-900 text-sm max-w-[500px] mx-auto leading-relaxed">
              For outstanding efforts and achievements in our recent program.
            </p>
          </div>
          <div className="absolute bottom-10 flex justify-around w-4/5 text-center text-green-800">
            <div>
              <div className="border-t-2 border-green-600 w-40 mt-2"></div>
              <p className="font-bold mt-1">Event Lead</p>
            </div>
            <div>
              <div className="border-t-2 border-green-600 w-40 mt-2"></div>
              <p className="font-bold mt-1">Coordinator</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
