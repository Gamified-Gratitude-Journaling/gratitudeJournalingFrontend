import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';

// Render each example Component with an appropriate header
const app = () => {
  return (
    <BrowserRouter>
      <div class="flex justify-center">
        <div class="max-w-7xl">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default app;
