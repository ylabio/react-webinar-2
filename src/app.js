import React, { useCallback } from 'react';
import List from './components/list';
import Layout from './components/layout';
import Controls from './components/controls';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAddBucket: useCallback((code) => {
      store.addBucket(code);
    }, []),
    onDeleteBucket: useCallback((code) => {
      store.deleteBucket(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        items={store.getState().bucket}
        onItemDeleteBucket={callbacks.onDeleteBucket}
      ></Controls>

      <List
        items={store.getState().items}
        onItemAddBucket={callbacks.onAddBucket}
      />
    </Layout>
  );
}

export default App;
