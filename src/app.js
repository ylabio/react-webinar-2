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
  const counterWord = 'раз' + {};
  const [flag, setFlag] = React.useState('раз');

  const checkEnding = (a) => {
    //alert(checkEnding);
    let tmp = a;
    while (Math.ceil(Math.log(tmp + 1) / Math.LN10) > 2) {
      tmp = Math.floor(tmp / 10);
      alert('asda');
    }

    if (
      (tmp % 10 == 4 && tmp != 14) ||
      (tmp % 10 == 2 && tmp != 12) ||
      (tmp % 10 == 3 && tmp != 13)
    ) {
      setFlag('раза');
    } else setFlag('раз');
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
            store.createItem({ code, title: `Новая запись ${code}`, counter: 0 });
          }}>
          {' '}
          Добавить{' '}
        </button>
      </div>
      <div className="App__center">
        <div className="List">
          {items.map((item) => (
            <div key={item.code} className="List__item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => {
                  store.selectItem(item.code, item.counter);

                  checkEnding(item.counter);
                  console.log(item.counter);
                }}>
                <div className="Item__number">{item.code}</div>
                <div className="Item__title">
                  {item.title}
                  {item.counter != 0 && (
                    <span className="Item__counter">
                      {' '}
                      | Выделялось {item.counter} {flag}
                    </span>
                  )}
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
