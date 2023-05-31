import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index_css/reset.css';
import './index_css/index.css';
import "./fonts/font-faces.css";
import App from './AppComponent/App';
import Store from './store/store';

const store = new Store();

export const context = createContext({store})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <context.Provider value={{store}}>
    <App />
    </context.Provider>
  
);

