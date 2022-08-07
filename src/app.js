import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import AppContextProvider from './context/app-context';
import AppLayout from "./layout/app-layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  return (
    <AppContextProvider store={store}>
      <AppLayout head={<h1>Магазин</h1>}>
        <Controls />
        <List />
      </AppLayout>
    </AppContextProvider>
  );
}

export default App;
