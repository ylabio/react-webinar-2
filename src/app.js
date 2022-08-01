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
  
  /**
   * Функция подбора склонений
   * @param number Целое число для которого выполняется склонение
   * @param array Массив возможных окончаний
   * @param cases Случаи при которых выбирается необходимый индекс из массива
   * @return {string} подходящий вариант из массива txt для переданого числа number
   */
  const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => 
  txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

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
              <div className='Item__title'>{item.title} 
                {item.selectCount > 0 && `| Выделялось ${item.selectCount} ${declination(item.selectCount, ['раз', 'раза', 'раз'])}`}</div>
              <div className='Item__select'>{}</div>
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
