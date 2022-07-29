import React from 'react';
import {counter} from './utils.js';
import './style.css';

//для правильного вывода на экран словосочетания "1 раз" - "2 раза"
const regex1 = /[2-4]$/;
const regex2 = /[1][2-4]$/;

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

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
              <div className='Item__title'>
                  {item.title}&nbsp;
                  {item.wasChoosen ? (
                    <span>
                      {' '}
                      | Выделялся&nbsp;{item.wasChoosen}&nbsp;
                      {regex1.test(item.wasChoosen.toString()) &&
                      !regex2.test(item.wasChoosen.toString())
                        ? "раза"
                        : "раз"}
                    </span>
                  ) : null}
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
