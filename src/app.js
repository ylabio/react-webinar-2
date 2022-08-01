import React, { useState } from 'react';
import {counter, checkA} from './utils.js';
import './style.css';

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
        <div className='List'>{items.map(item => <ListItem item={item} store={store} key={item.code} />)}</div>
      </div>
    </div>
  );
}

export default App;

const ListItem = ({ item, store }) => {
  const [count, setCount] = useState(0)
  
  const clickItemHandler = () => {
    store.selectItem(item.code)

    if (item.selected) {
      setCount((prevState) => prevState += 1)
    }
  }

  const countOfSelectText = count ? `| Выделился ${count} раз${checkA(count) ? "a" : ''}` : ''
 
  return (
    <div key={item.code} className='List__item'>
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                 onClick={clickItemHandler}>
              <div className='Item__number'>{item.code}</div>
              <div className='Item__title'>{item.title} {countOfSelectText}</div>
              <div className='Item__actions'>
                <button onClick={() => store.deleteItem(item.code)}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
  )
}
