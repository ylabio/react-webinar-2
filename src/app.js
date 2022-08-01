import React from 'react';
import {counter} from './utils.js';
import plural from 'plural-ru';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();
  const clickHandler = (event, item) => {
      event.stopPropagation();
      store.deleteItem(item);
  };

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
                <div className="Item__title title">
                    <span className='title__text'>{item.title}</span>
                    <span className='title__count-selected'>
                    {item.countSelected
                        ? ` | Выделялось ${item.countSelected} ${plural(
                            item.countSelected,
                            'раз',
                            'раза',
                            'раз'
                        )}`
                        : ''}
                  </span>
                </div>
                <div className='Item__actions'>
                <button onClick={(e) => clickHandler(e, item.code)}>
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
