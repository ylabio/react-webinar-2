import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onOpenPanel: useCallback(() => {
      store.openPanel();
    }, []),
    onClosePanel: useCallback(() => {
      store.closePanel();
    }, []),
    addItem: useCallback((item) => {
      store.addItem(item);
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onOpenPanel={callbacks.onOpenPanel} cartList={store.getState().cartList}/>
      <List items={store.getState().items}
            addItem={callbacks.addItem}
      />
      {store.getState().isShown && (
        <Cart 
          onClosePanel={callbacks.onClosePanel}
          onDeleteItem={callbacks.onDeleteItem}
          cartList={store.getState().cartList}  
        />
      )}
    </Layout>
  );
}

export default App;
