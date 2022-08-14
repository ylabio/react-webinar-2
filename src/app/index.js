import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./main";
import ItemPage from './item';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/page/:pageId" element={<Main />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="*" element={<Navigate to="/page/1" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
