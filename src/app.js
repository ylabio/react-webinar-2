import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <Controls store={store}/>
      <div className='App__center'>
        <List store={store}/>
      </div>
    </div>
  );
}

export default App;
