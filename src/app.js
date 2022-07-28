import React from 'react';
import {counter} from './utils.js';
import './style.css';
import Controls from "./components/controls";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <Controls store={store}/>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} className='List__item'>

          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
