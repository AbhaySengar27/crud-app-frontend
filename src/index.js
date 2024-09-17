import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';  // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS globally

// Render the App component to the root element in the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
