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
  
  const buildItem = ({selected, code, title, countSelected}) => {
    const countSelectedHtmlWithLine = <div className='Item__info-inner-box'><div className='Item__vertical-line'></div><p className='Item__countSelected'>{`Выделялся ${countSelected}`}</p></div>;
    return <div key={code} className='List__item'>
        <div className={'Item' + (selected ? ' Item_selected' : '')}
            onClick={() => {
              store.selectItem(code);
            }}>
          <div className='Item__number'>{code}</div>
          <div className="Item__info-box">
            <div className='Item__title'>{title}</div>
            
            {countSelected > 0 && countSelectedHtmlWithLine}
          </div>
          
          <div className='Item__actions'>
            <button onClick={() => store.deleteItem(code)}>
              Удалить
            </button>
          </div>
        </div>
      </div>
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
        <div className='List'>{items.map(buildItem)}
        </div>
      </div>
    </div>
  );
}

export default App;
