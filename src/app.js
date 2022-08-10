import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {
  console.log("appstore", store);
  const [show, setShow] = React.useState(false);

  const onIsShow = () => {
    setShow(!show);
    console.log(show);
  };

  const callbacks = {
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          isShow={onIsShow}
          countCartItems={store.getState().countCartItems}
          sumCart={store.getState().sumCart}
        />
        <List
          items={store.getState().items}
          onItemSelect={callbacks.onSelectItems}
        />

        {show && (
          <Cart
            items={store.getState().cartItems}
            onItemDelete={callbacks.onDeleteItems}
            onIsShow={onIsShow}
            countCartItems={store.getState().countCartItems}
            sumCart={store.getState().sumCart}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
