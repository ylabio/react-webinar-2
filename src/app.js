import React, {useState, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from "./components/basket";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  // Состояние видимости попапа корзины
  const [popupState, setPopupState] = useState(false);


  const callbacks = {
    // onAdd: useCallback(() => {
    //   const code = counter();
    //   store.createItem({code, title: `Новая запись ${code}`});
    // }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    openPopup: useCallback(() => {
      setPopupState(true);
    }, []),
    closePopup: useCallback(() => {
      setPopupState(false);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls openPopup={callbacks.openPopup}/>
        <List items={store.getState().items}
              onItemSelect={callbacks.onSelectItems}
              onItemDelete={callbacks.onDeleteItems}
        />
      </Layout>
      <Basket isVisible={popupState}
              closePopup={callbacks.closePopup}
      />
    </>
  );
}

export default App;
