import React, {useCallback} from 'react';
import Cart from './components/cart';
import Controls from "./components/controls";
import List from "./components/list";
import AppContextProvider from './context/app-context';
import AppLayout from "./layout/app-layout";
import './global.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { isCartOpen } = store.state;
  
  return (
    <AppContextProvider store={store}>
      {isCartOpen && (
        <Cart />
      )}
      <AppLayout head={<h1>Магазин</h1>}>
        <Controls />
        <List />
      </AppLayout>
    </AppContextProvider>
  );
}

export default App;
