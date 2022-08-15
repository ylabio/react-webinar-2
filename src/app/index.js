import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InfoPage from './info-page/index.js'
import Main from "./main";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App() {

  console.log('App');

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/info/:id' element={<InfoPage />}/>
      </Routes>
    </>
  );
}

export default React.memo(App);
