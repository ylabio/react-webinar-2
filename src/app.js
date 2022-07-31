import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  console.log('App');

  const onAdd = useCallback(() => {
    const code = counter();
    store.createItem({code, title: `Новая запись ${code}`});
  }, []);

  const onSelectItems = useCallback((code) => {
    store.selectItem(code);
  }, []);

  const onDeleteItems = useCallback((code) => {
    store.deleteItem(code);
  }, []);

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onAdd={onAdd}/>
      <List items={store.getState().items} onItemSelect={onSelectItems}
            onItemDelete={onDeleteItems}/>
    </Layout>
  );
}

export default App;
