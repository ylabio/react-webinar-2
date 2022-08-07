import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Card from './components/card';

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
    }, []),
    onDeleteCardItem: useCallback((code) => {
      store.deleteCardItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls toCard={callbacks.toCard} cardsValue={store.getState().card} />
      
      <List items={store.getState().items} cardActive={callbacks.addToCard} isCardShow={isCardShow}/>

      {isCardShow && <Card cardList={store.getState().card} сardClose={callbacks.toCard} onDeleteCardItem={callbacks.onDeleteCardItem} isCardShow={isCardShow}/>}
    </Layout>
  );
}

export default App;
