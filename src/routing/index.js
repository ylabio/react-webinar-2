import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Card from '../app/card';
import Main from '../app/main';

function Routing() {

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path=':id' element={<Card />} />
    </Routes>
  );
}

export default Routing;