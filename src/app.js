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

  function getLastDigit(n) {
    if (n < 20 || n % 10 === 0) {
      return n;
    } else {
      return n % 10;
    }
  }

  function getTitle (item) {
    let title = item.title;
    let lastDigit = getLastDigit(item.timesSelected);

    if (lastDigit === 0) {
      return title;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      title += ` | Выделялось ${item.timesSelected} раза`;
    } else {
      title += ` | Выделялось ${item.timesSelected} раз`;
    }

    return title;
  }

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={() => {
          const code = counter();
          store.createItem({code, title: `Новая запись ${code}`})
        }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                 onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{getTitle(item)}</div>
              <div className='Item__actions'>
                <button onClick={() => store.deleteItem(item.code)}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
