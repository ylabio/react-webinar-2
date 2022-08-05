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

  function findNumberOfSelections(num){
      if(num===12||num===13||num===14)   return `| Выделялось ${num} раз`

      let lastDigit= num%10
      if(lastDigit===2||lastDigit===3||lastDigit===4){
          return `| Выделялось ${num} раза`
      }else {
          return `| Выделялось ${num} раз`
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
        <div className='List'>
            {items.map(item =>
          <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                 onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{item.title}
                  {item.counter>0 && <span> {findNumberOfSelections(item.counter)} </span>}
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
