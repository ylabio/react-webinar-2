import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Card from "./components/card";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {
  const [show, setShow] = React.useState(true);

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
        <Controls isShow={onIsShow} />
        <List
          items={store.getState().items}
          onItemSelect={callbacks.onSelectItems}
          onItemDelete={callbacks.onDeleteItems}
        />

        {show && <Card items={store.cartItems} />}
      </Layout>
    </>
  );
}

export default App;
