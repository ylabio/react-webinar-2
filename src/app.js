import React from 'react';
import { counter } from './utils.js';
import './style.css';
import plural from 'plural-ru';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  const checkSelect = (code) => {
    store.selectItem(code);
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
            store.createItem({ code, title: `Новая запись` });
          }}>
          Добавить
        </button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <div key={item.code} className="List__item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => checkSelect(item.code)}>
                <div className="Item_desc">
                  <div className="Item__number">{item.code}</div>
                  <div className="Item__title">{item.title}</div>
                  <div className="Item_count">
                    {item.count > 0 && (
                      <div className="Count">
                        <div className="Count_line"></div>
                        <div className="Count_number">
                          {/* {(item.count % 10 == 2 && item.count % 100 !== 12) ||
                          (item.count % 10 == 3 && item.count % 100 !== 13) ||
                          (item.count % 10 == 4 && item.count % 100 !== 14)
                            ? `Выделялось ${item.count} раза`
                            : `Выделялось ${item.count} раз`} */}
                          {item.count
                            ? `  Выделялось ${item.count} ${plural(
                                item.count,
                                'раз',
                                'раза',
                                'раз',
                              )}`
                            : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()} className="Item__actions">
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
