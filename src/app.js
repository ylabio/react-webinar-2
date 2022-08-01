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

  const handleSelected = (e, item) => {
    if (e.target.tagName == "BUTTON") return false;
    if(!item.selected) item.focusedTimes +=  1;
    store.selectItem(item.code)

    items.map(i => {
      if (i.code != item.code) i.selected = false
    })
  }

  const showTimes = (fTimes) => {
    let times = "раз";
    const lastDigit = fTimes.toString()[fTimes.toString().length - 1];

    if((Number(lastDigit) == 2 && fTimes != 12) || (Number(lastDigit) == 3 && fTimes != 13) || (Number(lastDigit) == 4 && fTimes != 14)) times = "раза";
    else times = "раз";

    return times;
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
                 onClick={(e) => handleSelected(e, item)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{item.focusedTimes == 0 ? item.title : item.title + ` | Выделялся ${item.focusedTimes} ${showTimes(item.focusedTimes)}`}</div>
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
