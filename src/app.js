import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import AppLayout from "./layout/app-layout";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { items } = store.state;

  return (
    <AppLayout head={<h1>Магазин</h1>}>
      <Controls />
      <List items={items} />
    </AppLayout>
  );
}

export default App;
