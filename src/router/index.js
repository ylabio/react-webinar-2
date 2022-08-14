import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import App from '../app';
import Itempage from '../app/itempage';
import Shop from '../app/shop';

function Router({ setTitle }) {
  return (
    <Routes>
      <Route path='/' element={<Shop setTitle={setTitle} />} />
      <Route path='/:id' element={<Itempage setTitle={setTitle} />} />
    </Routes>
  );
}
export default React.memo(Router);
