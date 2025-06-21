import React from 'react';

function Template1({ data, startIndex = 0 }) {
  return (
    <div className="bg-gray-100 p-4">
      {data.map((student, index) => (
        <div
          key={index}
          id={`certificate-${index + startIndex}`}
          className="w-[600px] h-[420px] mx-auto my-4 border-4 border-[#002F5E] rounded-3xl relative bg-white flex flex-col items-center justify-center p-4"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#002F5E]">CERTIFICATE</h1>
            <h2 className="text-xl font-semibold text-[#002F5E] mt-1">OF APPRECIATION</h2>
          </div>

          {/* Recipient */}
          <div className="mb-4 text-center">
            <p className="text-base">This certificate is proudly presented to</p>
            <h3 className="text-2xl font-bold mt-1">{student.Name}</h3>
            <div className="border-t-2 border-gray-600 w-3/4 mx-auto mt-2"></div>
          </div>

          {/* Message */}
          <div className="text-center max-w-[500px] text-sm leading-relaxed">
            In recognition of your dedication and valued contribution to our event.
            We deeply appreciate your commitment and efforts.
          </div>

          {/* Details */}
          <div className="mb-7 mt-2 text-center space-y-1 text-sm">
            <p>Department: {student.Department}</p>
            <p>Roll Number: {student['Roll no']}</p>
            <p>Year: {student.Year || 'N/A'}</p>
          </div>

          {/* Signatures */}
          <div className="absolute bottom-12 flex justify-around w-4/5 gap-20">
            <div className="text-center">
              <div className="border-t-2 border-gray-600 w-32 mt-2"></div>
              <p className="mt-1 text-xs">Signature 1</p>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-gray-600 w-32 mt-2"></div>
              <p className="mt-1 text-xs">Signature 2</p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="absolute bottom-0 w-full h-5 bg-[#F57A20] rounded-b-3xl"></div>
        </div>
      ))}
    </div>
  );
}

export default Template1;
