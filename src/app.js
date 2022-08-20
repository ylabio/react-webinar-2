import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import Layout from "./components/layout";
import Popup from "./components/popup";
import Product from "./components/product";
import Footer from "./components/footer";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [popup, setPopup] = useState(false);

  const callbacks = {
    onAddCart: useCallback(({code, title, price}) => {
      store.addItemCart({code, title, price});
    }, []),
    onDeleteCart: useCallback(({code}) => {
      store.deleteItemCart(code);
    }, []),
    changePopup: useCallback((value) => {
      return setPopup(value);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls openPopup={callbacks.changePopup}
                  countAndSum={store.getState().calcInCart}
                   />
        <Product items={store.getState().items}
                 onBtn={callbacks.onAddCart}
                 btn="Добавить"
        />
      </Layout>
      {
        popup &&
          <Popup title={<span>Корзина</span>} closePopup={callbacks.changePopup}>
              <Product items={store.getState().cart}
                       onBtn={callbacks.onDeleteCart}
                       btn="Удалить"
              >
                <Footer countAndSum={store.getState().calcInCart}/>
              </Product>
          </Popup>
      }
    </>
  );
}

export default App;
