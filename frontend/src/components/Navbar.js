import React from 'react';
//import './Navbar.css'; // Add styling for the Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand-name">CertifiQ</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
        <a href="/preview">Preview</a>
      </div>
    </nav>
  );
}

export default Navbar;
