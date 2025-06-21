import React, { useState } from 'react';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import { useNavigate, useLocation } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate, certificateData, fullData } = location.state || {};

  const [borderColor, setBorderColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('serif');

  const handleDone = () => {
    navigate('/upload', {
      state: {
        customizedStyles: {
          borderColor,
          bgColor,
          fontFamily,
        },
        certificateData: fullData, // all students
        selectedTemplate,
      },
    });
  };

  const TemplateComponent = selectedTemplate === 'template1' ? Template1 : Template2;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-400 to-pink-500 text-white">
      <h2 className="text-3xl mb-6 font-bold">Customize Certificate</h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block mb-2">Border Color</label>
            <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Background Color</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Font Style</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="text-black rounded p-1"
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans-serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
            </select>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            onClick={handleDone}
          >
            Done
          </button>
        </div>

        <div className="flex-1 bg-white p-4 rounded shadow text-black">
          <h3 className="text-xl mb-2">Live Preview</h3>
          <TemplateComponent
            data={[certificateData]}
            startIndex={0}
            customStyles={{ borderColor, bgColor, fontFamily }}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
