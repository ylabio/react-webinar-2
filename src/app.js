import React from 'react';
import {counter} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  const createItem = () => {
    const code = counter();
    store.createItem({ code, title: `Новая запись ${code}` });
  };

  return (
    <div className='app'>
      <div className='app__head'>
        <h1 className='app__header'>Приложение на чистом JS</h1>
      </div>

      <div className='app__controls'>
        <button onClick={createItem}>Добавить</button>
      </div>

      <ul className='app__list'>
        {items.map(item =>
          <li
            key={item.code}
            className={item.selected ? 'item item--selected' : 'item'}
            onClick={() => store.selectItem(item.code)}
          >
            <p className='item__code'>{item.code}</p>

            <p className='item__text'>{
              (item.timesSelected > 0)
                ? `${item.title} | Выбрано ${item.timesSelected} раз`
                : item.title
            }</p>

            <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
