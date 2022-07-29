import React from 'react';
import {counter, getDeclension} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

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
                 onClick={(evt) => store.selectItem(item.code, evt)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>
                {`${item.title}${item.selectionCount ?
                  ` | Выделялся ${item.selectionCount} ${getDeclension(item.selectionCount, ['раз', 'раза', 'раз'])}` :
                  ''}`}
              </div>
              <div className='Item__actions'>
                <button className='Item__deletion' onClick={() => store.deleteItem(item.code)}>
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
