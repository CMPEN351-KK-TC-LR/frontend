import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Basic CSS file to use bootstrap with this application
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
