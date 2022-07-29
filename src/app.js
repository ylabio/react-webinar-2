import React from 'react';
import {counter} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

  const addItem = () => {
    const code = counter();
    store.createItem({code, title: `Новая запись ${code}`})
  }

  // Оработка клика 
  const selectItemHandler = (code) => {
    store.selectItem(code);
    store.incremetSelectCounter(code);
  }

  const itemsList = items.map(item => 
    <div key={item.code} className='List__item'>
      <div 
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => selectItemHandler(item.code)}
      >
        <div className='Item__number'>{item.code}</div>
        <div className='Item__title'>
          {item.title}
          {item.selectCount > 0 && ` | Выделялся ${item.selectCount} раз`}
        </div>
        <div className='Item__actions'>
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={addItem}>Добавить</button>
      </div>
      <div className='App__center'>
        <div className='List'>
          {itemsList}
        </div>
      </div>
    </div>
  );
}

export default App;
