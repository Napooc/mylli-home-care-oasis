import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<div className="p-8">
            <h1 className="text-2xl font-bold">Hello World</h1>
            <p>Application is working!</p>
          </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;