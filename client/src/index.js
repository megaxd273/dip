import React from 'react';
import ReactDOM from 'react-dom/client';
import './index_css/reset.css';
import './index_css/index.css';
import "./fonts/font-faces.css";
import App from './AppComponent/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

