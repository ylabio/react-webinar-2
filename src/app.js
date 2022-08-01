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

  const activeListClass = 'Item_selected';

  return (
    <div className="App">
      <div className="App__head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="Controls">
        <button
          onClick={() => {
            const code = counter();
            store.createItem({
              code,
              title: `Новая запись ${code}`,
            });
          }}
        >
          {' '}
          Добавить{' '}
        </button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => {
            const counterLastNumber = item.counter.toString().slice(-1);
            const counterLastNumbers = item.counter.toString().slice(-2);

            const counterText =
              counterLastNumber > 1 &&
              counterLastNumber < 5 &&
              counterLastNumbers != 12 &&
              counterLastNumbers != 13 &&
              counterLastNumbers != 14
                ? `Выделялось ${item.counter} раза`
                : `Выделялось ${item.counter} раз`;
            return (
              <div key={item.code} className="List__item">
                <div
                  className={item.selected ? `Item ${activeListClass}` : 'Item'}
                  onClick={() => {
                    store.selectItem(item.code);
                    if (item.selected) {
                      item.counter = item.counter + 1;
                      return item.counter;
                    } else {
                      return item.counter;
                    }
                  }}
                >
                  <div className="Item__number">{item.code}</div>
                  <div className="Item__title">
                    {item.counter == 0
                      ? `${item.title}`
                      : `${item.title} | ${counterText}`}
                  </div>
                  <div className="Item__actions">
                    <button onClick={() => store.deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
