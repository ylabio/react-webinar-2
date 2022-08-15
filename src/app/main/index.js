import Layout from '../../components/layout';
import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Controls from '../../components/controls';
import Shop from '../shop';
import ItemPage from '../itempage';

function Main() {
  console.log('Main');

  const [title, setTitle] = useState('');

  const callbacks = {
    setTitle: useCallback((title) => setTitle(title), []),
  };

  return (
    <Layout head={<h1>{title}</h1>}>
      <Controls />
      <Routes>
        <Route path='/' element={<Shop setTitle={callbacks.setTitle} />} />
        <Route path='/:id' element={<ItemPage setTitle={callbacks.setTitle} />} />
      </Routes>
    </Layout>
  );
}

export default React.memo(Main);
