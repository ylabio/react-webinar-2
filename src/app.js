import React, { useCallback } from 'react';
import List from './components/list';
import Layout from './components/layout';
import Controls from './components/controls';
import Modal from './components/modal';
import BucketElement from './components/bucketElement';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        bucket={store.getState().bucket}
        setIsModalOpen={setIsModalOpen}
      ></Controls>

      <List
        items={store.getState().items}
        onItemAddBucket={callbacks.onAddBucket}
      >
        <Item />
      </List>

      {isModalOpen && (
        <Modal
          header={<h2>Корзина</h2>}
          setIsModalOpen={setIsModalOpen}
          footer={
            <p>
              Итого{' '}
              {new Intl.NumberFormat('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
              }).format(store.getState().bucket.totalPrice)}
            </p>
          }
        >


          <List
            items={store.getState().bucket.bucketElements}
            onItemDeleteBucket={callbacks.onDeleteBucket}
          >

            <BucketElement />

          </List>
          
        </Modal>
      )}
    </Layout>
  );
}

export default App;
