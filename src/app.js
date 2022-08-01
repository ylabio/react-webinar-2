import React, { useState } from 'react';
import {counter, getCorrectEnding} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isPicked, setIsPicked] = useState(false);
  // Выбор состояния из store
  const {items, lastPicked} = store.getState();

  function handleSelection(code, store) {
    if (code === lastPicked) {
      if (isPicked) {
        store.selectItem(code, false);
      } else {
        store.selectItem(code, true);
      }

      setIsPicked(!isPicked);
    } else {
      setIsPicked(true);
      store.selectItem(code, true);
    }
    
    store.setState({
      ...store.getState(),
      lastPicked: code,
    })
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
            <div className={'Item' + (
                isPicked && item.code === lastPicked 
                ? ' Item_selected' 
                : ''
              )}
                 onClick={() => handleSelection(item.code, store)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>
                {item.title}
                {' '}
                {item.counter > 0 && lastPicked === item.code && (
                  <span>| Выделялся {item.counter} {
                    getCorrectEnding(item.counter, 'раз', 'раза')
                  }</span>
                )} 
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

