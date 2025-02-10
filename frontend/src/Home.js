import React from 'react';
import Navbar from './components/Navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1>Welcome to CertifiQ</h1>
        <p>Generate personalized certificates in just a few clicks!</p>
        <a href="/upload">Get Started</a>
      </div>
    </div>
  );
}

export default HomePage;
