import React, { Fragment, useCallback, useState } from 'react';
import InfoBasket from "./components/InfoBasket";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from './components/basket';
import { counter, TotalSum } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  console.log(store.state.basket);

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    // onSelectItems: useCallback((code) => {
    //   store.selectItem(code);
    // }, []),
    onAddBasket: useCallback((code) => {
      store.addItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),




  }

  const [modal, setModal] = useState(false);


  const totalPricaAndProduct = store.state.basket.length > 0 ? TotalSum(store.state.basket) : "пусто";



  return (
    <Fragment>
      <Layout head={<h1>Магазин</h1>} >
        <InfoBasket modalVal={modal} setModal={setModal} tPaP={totalPricaAndProduct} />
        <List items={store.getState().items}
          onItemDelete={callbacks.onDeleteItems}
          onAddBasket={callbacks.onAddBasket}
          totalPricaAndProduct={callbacks.totalPricaAndProduct}
        />
      </Layout>
      <Basket head={<h2>Корзина</h2>} modalVal={modal} setModal={setModal} tPaP={totalPricaAndProduct}>
        <List items={store.getState().basket}
          onItemDelete={callbacks.onDeleteItems}
          onAddBasket={callbacks.onAddBasket}
          reUse={true}
        />
      </Basket>
    </Fragment>
  );
}

export default App;
