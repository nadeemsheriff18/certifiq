import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './Home';
import UploadForm from './Upload';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        
      </Routes>
    </div>
  );
}

export default App;
