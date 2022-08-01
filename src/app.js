import React, {useCallback, useMemo} from 'react';
import {counter, formattingTextForNumber} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

  const deleteItemFunc = (code, event) => {
    event.stopPropagation();
    store.deleteItem(code);
  }

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={() => {
          const code = counter();
          const count = 0;
          store.createItem({code, title: `Новая запись ${code}`, count})
        }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>
              <span>{item.title}</span>
              {item.count > 0 ? (
                <span className='Item__count'>| Выделялся {formattingTextForNumber(item.count,'раз', 'раза')}</span> 
              ): null}
              </div>
              <div className='Item__actions'>
                <button onClick={(event) => deleteItemFunc(item.code, event)}>
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
