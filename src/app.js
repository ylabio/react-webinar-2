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
  const createNewItem = () => {
    const code = counter();
    store.createItem({code, title: `Новая запись ${code}`})
  }
  const select = ({code, selected}) => {
    if (!selected) {
      store.incrementItemCounter(code)
    }
    store.selectItem(code)
  }
  return (
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button onClick={createNewItem}>Добавить</button>
      </div>
      <div className='App__center'>
        <div className='List'>{items.map(item =>
          <Item
            key={item.code}
            itemInfo={item}
            deleteItem={() => store.deleteItem(item.code)}
            selectItem={() => select(item)}
          />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
