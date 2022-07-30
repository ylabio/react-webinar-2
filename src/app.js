import React from 'react';
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

  const onAdd = () => {
    const code = counter();
    store.createItem({code, title: `Новая запись ${code}`});
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onAdd={onAdd}/>
      <List store={store}/>
    </Layout>
  );
}

export default App;
