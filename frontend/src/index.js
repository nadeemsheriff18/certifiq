import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your entire app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
