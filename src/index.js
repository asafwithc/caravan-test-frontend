import React from 'react';
import ReactDOM from 'react-dom/client';

import './config/firebase-config';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
try{
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
}catch(err){
  console.log(err);
}
