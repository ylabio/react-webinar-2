
import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
>>>>>>> 17e702cc7760549eec360e526244744df3f36f3b

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
>>>>>>> 17e702cc7760549eec360e526244744df3f36f3b
  );
}

export default App;
