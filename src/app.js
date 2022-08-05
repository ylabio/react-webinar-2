import React from 'react';
import './index.css';
import Catalog from './pages/catalog';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  return (
    <Catalog store={store}/>
  );
}

export default App;
