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
  
  //Счетчик количества выделений
  const renderCountSelection = (item) => {
   if(item.countSelected > 0 && item.countSelected < 5)  {
     return ` | Выделялось ${item.countSelected} раза`;
   };
   if(item.countSelected > 4) {
    return ` | Выделялось ${item.countSelected} раз`;
   };
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
          console.log(items);
        }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                 onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{item.title}{renderCountSelection(item)}</div>
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
