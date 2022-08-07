import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import PopupWindow from "./components/popup-window";
import Cart from "./components/cart";
import ListCart from "./components/list-cart";
import Total from "./components/total";
import counter from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [cartVisible, setCartVisible] = useState(false);

  const callbacks = {
    onSelectItems: useCallback((item) => {
      store.selectItem(item);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    changeCartVisible: useCallback((value) => {
      setCartVisible(value)
    }, []),
  }

  return (
    <>
      {cartVisible ? 
      <PopupWindow>
        <Cart head={<h1>Корзина</h1>} onClose={()=>{callbacks.changeCartVisible(false)}}>
          <ListCart items={store.getState().cartItems}
                onItemSelect={callbacks.onSelectItems}
                onItemDelete={callbacks.onDeleteItems}
          />
          <Total items={store.getState().cartItems}/>
        </Cart>
      </PopupWindow>
      :
      null
    }

      <Layout head={<h1>Магазин</h1>}>
        <Controls onShowCart={()=>{callbacks.changeCartVisible(true)}} cartInfo={store.getState().cartItems}/>
        <List items={store.getState().items}
              onItemSelect={callbacks.onSelectItems}
              onItemDelete={callbacks.onDeleteItems}
        />
      </Layout>
    </>
  );
}

export default App;
