import React from 'react';
import {counter, countOfAllocateToString} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

  const onDeleteItemClick = (event, code) => {
    event.stopPropagation();
    store.deleteItem(code);
  };

  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={() => {
          const id = counter();
          store.createItem({code: id, title: `Новая запись ${id}`})
        }}> Добавить
        </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(({code, title, selected, countOfAllocate}) =>
          <div key={code} className='List__item'>
            <div className={'Item' + (selected ? ' Item_selected' : '')}
                 onClick={() => store.selectItem(code)}>
              <div className='Item__number'>{code}</div>
              <div
                className='Item__title'>
                {`${title} ${countOfAllocateToString(countOfAllocate)}`}
              </div>
              <div className='Item__actions'>
                <button onClick={(event) => onDeleteItemClick(event, code)}>
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
