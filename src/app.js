import React, { useState } from 'react';
import { counter } from './utils.js';
import './style.css';
import { render } from 'react-dom';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();
  const [count, setCount] = useState({});

  function handleClick(id, selected) {
    if (count[id] && selected) {
      setCount(prev => ({ ...prev, [id]: count[id] + 1 }))
    } else {
      setCount(prev => ({ ...prev, [id]: 1 }))
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
          store.createItem({ code, title: `Новая запись ${code}` })
        }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} onClick={() => handleClick(item.code, item.selected)} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
              onClick={() => {
                store.selectItem(item.code)

              }}>

              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{item.title}  {count[item.code] ? ' ! Выделялся ' + count[item.code] + ' раз' : ''}</div>
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
