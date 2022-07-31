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
  // Фраза с количеством выделений
  function makePhraseWithCountRepeats(count) {
    const arr = String(count).split('');
    if (arr[arr.length - 2] != 1 && arr[arr.length - 1] > 1 && arr[arr.length - 1] < 5) {
      return ` | Выделялось ${count} раза`
    } else {
      return ` | Выделялось ${count} раз`
    }
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
              <div className='Item__title'>
                {item.title}
                <span className='Item__count-selected'>
                  {item.countSelected ? makePhraseWithCountRepeats(item.countSelected) : ''}
                </span>
              </div>
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
