import Layout from '../../components/layout';
import React, { useCallback, useState } from 'react';
import Router from '../../router';
import Controls from '../../components/controls';

function Main() {
  console.log('Main');

  const [title, setTitle] = useState('');

  const callbacks = {
    setTitle: useCallback((title) => setTitle(title), []),
  };

  return (
    <Layout head={<h1>{title}</h1>}>
      <Controls />
      <Router setTitle={callbacks.setTitle} />
    </Layout>
  );
}

export default React.memo(Main);
