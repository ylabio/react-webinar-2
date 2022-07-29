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

  const disabler = (e, code) => {
    items.forEach((item) => {
      if (item.code !== code) {
        item.selected = false;
      }
    });
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
            // const [listCounter, setListCounter] = React.useState(0);

            return (
              <div key={item.code} className="List__item">
                <div
                  className={item.selected ? `Item ${activeListClass}` : 'Item'}
                  onClick={(e) => {
                    disabler(e, item.code);
                    store.selectItem(item.code);
                    if (item.selected) {
                      item.counter = item.counter + 1;
                      return item.counter;
                    } else {
                      return item.counter;
                    }
                    // item.selected ? item.counter + 1 : item.counter;
                  }}
                >
                  <div className="Item__number">{item.code}</div>
                  <div className="Item__title">{item.title}</div>
                  <div className="Item__counter">
                    {item.counter == 0 ? '' : `Выделялось ${item.counter} раз`}
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
