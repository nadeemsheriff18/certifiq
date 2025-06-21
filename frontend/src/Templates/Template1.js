import React from 'react';

export default function Template1({ data, startIndex = 0, customStyles = {} }) {
  // Safely extract or fall back to defaults
  const {
    borderColor = '#eab308',     // Tailwind yellow-600
    bgColor = '#faf7f1',
    fontFamily = 'serif',
  } = customStyles || {}; // ensure even if null is passed

  return (
    <div className="p-4">
      {data.map((student, index) => (
        <div
          key={index}
          id={`certificate-${index + startIndex}`}
          className="relative w-[600px] h-[420px] mx-auto my-4 rounded-3xl flex flex-col items-center justify-center p-4"
          style={{
            border: `8px solid ${borderColor}`,
            backgroundColor: bgColor,
            fontFamily: fontFamily,
          }}
        >
          {/* Title & Body */}
          <div className="text-center mb-20">
            <h1 className="text-3xl font-bold text-[#3d1f57]">CERTIFICATE</h1>
            <h2 className="text-xl font-semibold text-[#3d1f57]">OF APPRECIATION</h2>
            <p className="mt-2 text-base font-semibold text-[#3d1f57]">
              This certificate is proudly presented to
            </p>
            <h3 className="text-3xl mt-1 text-[#a88946]">{student.Name}</h3>
            <div className="w-3/5 mx-auto border-t-2 border-[#a88946] mt-1"></div>
            <p className="mt-3 text-[#3d1f57] text-sm max-w-[500px] mx-auto leading-relaxed">
              In recognition of {student.Name}'s dedication and valued contribution to our event,
              we deeply appreciate your commitment and efforts.
            </p>
          </div>

          {/* Signatures */}
          <div className="absolute bottom-10 flex justify-around w-4/5 text-center">
            <div>
              <div className="border-t-2 border-[#a88946] w-40 mt-2"></div>
              <p className="mt-1 font-bold text-[#3d1f57]">Nadeem Sheriff</p>
              <p className="italic text-[#3d1f57]">Founder</p>
            </div>
            <div>
              <div className="border-t-2 border-[#a88946] w-40 mt-2"></div>
              <p className="mt-1 font-bold text-[#3d1f57]">Harshini</p>
              <p className="italic text-[#3d1f57]">Manager</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
