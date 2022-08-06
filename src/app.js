import React, {useCallback} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback((item) => {
      store.addToCart(item)
    }, []),

    onDelete: useCallback((item) => {
      store.deleteFromCart(item.code)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Cart items={store.getState().cartItems} 
            onDelete={callbacks.onDelete}
      />
      <List items={store.getState().items} 
            renderItem={(item) => (
              <Item key={item.code} 
                    item={item} 
                    buttonText={"Добавить"}
                    onButtonClick={callbacks.onAdd} 
              />
            )}
      /> 
    </Layout>
  );
}

export default App;
