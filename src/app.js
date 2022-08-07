import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Bucket from "./components/bucket";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onOpenBucket: useCallback(() => {
      store.openModal();
    }, []),
    onCloseBucket: useCallback(() => {
      store.closeModal();
    }, []),
    onAddItemToBucket: useCallback((code) => {
      store.addItemToBucket(code);
    }, []),
    onDeleteBucketItem: useCallback((code) => {
      store.deleteBucketItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onOpenBucket={callbacks.onOpenBucket}
                bucketItems={store.getState().bucketItems}
      />
      <List items={store.getState().items}
            itemClickHandler={callbacks.onAddItemToBucket}
            buttonText='Добавить'
      />
      <Bucket bucketItems={store.getState().bucketItems}
            onCloseBucket={callbacks.onCloseBucket}
            isOpen={store.getState().isOpen}
            itemClickHandler={callbacks.onDeleteBucketItem}
            buttonText='Удалить'
      />
    </Layout>
  );
}

export default App;
