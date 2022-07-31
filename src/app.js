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

  const selectionsCountMessage = (count) => {
    const countEnd = count % 100;
    const _countEnd = count % 10;
    if(countEnd > 10 && countEnd < 20) {
      return ` | Выделялось ${count} раз`
    }
    if(_countEnd > 1 && _countEnd < 5) {
      return ` | Выделялось ${count} раза`
    }
    return ` | Выделялось ${count} раз`
  }
  
  const deleteHandler = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code);
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
                onClick={() => store.selectItem(item.code)}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>
                {item.title}
                {item.selectionsCount > 0 && selectionsCountMessage(item.selectionsCount)}
              </div>
              <div className='Item__actions'>
                <button onClick={e => deleteHandler(e, item.code)}>
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
