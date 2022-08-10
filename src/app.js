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
    calcCountAndSumCart : useCallback(() => {
      return store.calcCountAndSumCart();
    }, []),
    showCountAndSum: useCallback(() => {
      return store.getState().calcInCart;
    }, [store.getState().calcInCart])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls openPopup={callbacks.changePopup}
                  showCountAndSum={callbacks.showCountAndSum}
                   />
        <Product items={store.getState().items}
                 onBtn={callbacks.onAddCart}
                 calcCountAndSumCart={callbacks.calcCountAndSumCart}
                 btn="Добавить"
        />
      </Layout>
      {
        popup &&
          <Popup title={<span>Корзина</span>} closePopup={callbacks.changePopup}>
              <Product items={store.getState().cart}
                       onBtn={callbacks.onDeleteCart}
                       calcCountAndSumCart={callbacks.calcCountAndSumCart}
                       btn="Удалить"
              >
                <Footer showSum={callbacks.showCountAndSum}/>
              </Product>
          </Popup>
      }
    </>
  );
}

export default App;
