import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Popup from "./components/popup";
import Footer from "./components/footer";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [popup, setPopup] = useState(false);
  const [countAndSum, setCountAndSum] = useState({count: 0, sum: 0});

  const callbacks = {
    onAddCart: useCallback(({code, title, price}) => {
      store.addItemCart({code, title, price});
    }, []),
    onDeleteCart: useCallback(({code}) => {
      store.deleteItemCart(code);
    }, []),
    openPopup: useCallback(() => {
      return setPopup(true);
    }, []),
    closePopup: useCallback(() => {
      return setPopup(false);
    }, []),
    getAllCounts : useCallback((code) => {
      setCountAndSum(store.getCountAndSumCart());
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls changePopup={callbacks.openPopup} countAndSum={countAndSum} showCountAndSum={true}>Перейти</Controls>
        <List items={store.getState().items}
              getAllCounts={callbacks.getAllCounts}
              onBtn={callbacks.onAddCart}
              btn="Добавить"
        />
      </Layout>
      {
        popup &&
          <Popup >
            <Layout
              head={
                <>
                  <h1>Корзина</h1>
                  <Controls changePopup={callbacks.closePopup}>Закрыть</Controls>
                </>
              }
            >
              <List items={store.getState().cart}
                    getAllCounts={callbacks.getAllCounts}
                    onBtn={callbacks.onDeleteCart}
                    btn="Удалить"
                    showCountItem={true}
              />
              {
                countAndSum.count
                ? <Footer countAndSum={countAndSum} />
                : ''
              }
            </Layout>
          </Popup>
      }
    </>
  );
}

export default App;
