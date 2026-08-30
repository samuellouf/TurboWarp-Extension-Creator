import React from 'react';
import ReactDOM from 'react-dom/client';
import Website from './website';
import WebApp from './app';
import NotFound from './404';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/TurboWarp-Extension-Creator/" element={<Website />} />
        <Route path="/TurboWarp-Extension-Creator/app" element={<WebApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
