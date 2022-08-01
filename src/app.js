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

  function counterSelected(number, one, two) {
    number %= 100;
    if (number > 10 && number < 20) {
      return one;
    }
    number %= 10;
    if (number > 1 && number < 5) {
      return two;
    }
    if (number == 1) {
      return one
    }
    return one;
  }


  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={() => {
          const code = counter();
          store.createItem({ code, title: `Новая запись ${code}` })
        }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
              onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>

              {
                item.counterSelected ?
                  <div className='Item__title'>{item.title} | Выделялось {item.counterSelected} {counterSelected(item.counterSelected, 'раз', 'раза')} </div> :
                  <div className='Item__title'>{item.title}</div>
              }

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
