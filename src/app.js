import React, {useCallback} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import {counter} from './utils';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    // add будет модалка
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onAddToCart: useCallback((id) => {
      const code = counter();
      store.addToCard(code, id);
    }, []),
    // onDeleteItems: useCallback((code) => {
    //   store.deleteItem(code);
    // }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onAddToCart={callbacks.onAddToCart}
      />
      {/* <Modal></Modal> */}
    </Layout>
    
  );
}

export default App;
