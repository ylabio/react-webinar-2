import React from 'react';
import { counter } from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  // Выбор состояния из store
  const { items } = store.getState();

  // const declension =  

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
        <div className='List'>
          {items.map(item => {
            const { code, title, selected, counterAllocation } = item;

            let declination = (counterAllocation === 1) ? 'раз' :
              (1 < counterAllocation && counterAllocation < 5) ? 'раза' :
                (5 <= counterAllocation && counterAllocation < 21) ? 'раз' :
                  (22 <= counterAllocation && counterAllocation <= 24) ? 'раза' :
                    (25 <= counterAllocation && counterAllocation <= 31) ? 'раз' :
                      'раз';
            return <div key={code} className='List__item'>
              <div className={'Item' + (selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(code)}>
                <div className='Item__number'>{code}</div>
                <div className='Item__title'>{title}&nbsp;
                  {counterAllocation !== 0 && `| Выделялось  ${counterAllocation} ${declination}`}
                </div>
                <div className='Item__actions'>
                  <button onClick={() => store.deleteItem(code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
