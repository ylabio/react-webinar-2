import React from 'react';
import { counter } from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  /**
   * Создает строку со склонением количества выделений
   * @param {*} number - количество выделений
   * @returns - строка
   */
  function getCountMessage(number) {
    let n = number % 100; 
    if (n > 10 && n < 20) {return `${number} раз`};
    n %= 10;  
    if (n > 1 && n < 5) {return `${number} раза`};
    return `${number} раз`;
  }

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button
          onClick={() => {
            const code = counter();
            store.createItem({ code, title: `Новая запись ${code}` });
          }}
        >
          {' '}
          Добавить{' '}
        </button>
      </div>
      <div className='App__center'>
        <div className='List'>
          {items.map((item) => (
            <div key={item.code} className='List__item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className='Item__number'>{item.code}</div>
                <div className='Item__title'>{item.title}
                  {!!item.marked && <span> | Выделялось {getCountMessage(item.marked)}</span>}
                </div>
                <div className='Item__actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
