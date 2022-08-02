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
  const rightWord = (count) => {
    const newCounter = count.toString().slice(count.length - 2, count.length);
    const counter = count.toString();
    if (counter[counter.length - 1] === '2' || counter[counter.length - 1] === '3' || counter[counter.length - 1] === '4') {
      if (newCounter.includes('12') || newCounter.includes('13') || newCounter.includes('14')) {
        return ' раз';
      }
      return ' раза';
    } else {
      return ' раз';
    }
  };

  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
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
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <div key={item.code} className="List__item">
              <div className={'Item' + (item.selected ? ' Item_selected' : '')} onClick={() => store.selectItem(item.code)}>
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.title} {item.counter > 0 ? ' | Выделялось ' + item.counter + rightWord(item.counter) : ''}
                </div>
                <div className="Item__actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
