import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './Home';
import UploadForm from './Upload';
import Edit from './Edit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
