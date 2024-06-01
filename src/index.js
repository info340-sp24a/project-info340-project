import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';

import './index.css';
import App from './component/App';
import { BrowserRouter } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyBM5lZc4BhY47JGAbXNfDlG-XAlJq41DRU",
  authDomain: "ski-resort-app-e75ab.firebaseapp.com",
  databaseURL: "https://ski-resort-app-e75ab-default-rtdb.firebaseio.com",
  projectId: "ski-resort-app-e75ab",
  storageBucket: "ski-resort-app-e75ab.appspot.com",
  messagingSenderId: "386341966194",
  appId: "1:386341966194:web:9139712819594024ee0deb"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>  
);
