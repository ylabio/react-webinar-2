import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Card from './components/card';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isCardShow, setCardShow] = useState(false)
  
  const callbacks = {
    toCard: useCallback(() => {
      setCardShow(isCardShow => !isCardShow)
      
    }, []),
    addToCard: useCallback((code) => {
      store.addToCard(code);
      store.getTotalPrice();
    }, []),
    onDeleteCardItem: useCallback((code) => {
      store.deleteCardItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
        <Controls toCard={callbacks.toCard} cardValue={store.getState().card} totalPrice={store.getState().totalPrice}/>
      
      <List items={store.getState().items} cardActive={callbacks.addToCard} isCardShow={isCardShow}/>

      {
      isCardShow && <Modal сardClose={callbacks.toCard} isCardShow={isCardShow} title={'Корзина'}>
        <Card cardList={store.getState().card} isCardShow={isCardShow} onDeleteCardItem={callbacks.onDeleteCardItem} totalPrice={store.getState().totalPrice}/>
      </Modal>
      }
    </Layout>
  );
}

export default App;
