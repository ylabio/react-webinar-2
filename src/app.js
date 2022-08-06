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

  //определяем видимость модального окна, false окно закрыто, true открыто
  const [ cardActive, setCardActive ] = useState(false);

  //onAddItems добавление в коризну, DeleteItems удаление в корзине
  const callbacks = {
    onAddItems: useCallback((code) => {
      store.addInCard(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls card={store.getState().card}
                openCard={setCardActive}/>
      <List items={store.getState().items}
            onItemAdd={callbacks.onAddItems}
      />
      <Card  active={cardActive}
             card={store.getState().card}
             setActive={setCardActive}
             onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}

export default App;
