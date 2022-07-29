import React from 'react';

/** Utils */
import {counter} from '../utils';

/** Components */
import Item from '../components/Item'

/** Styles */
import '../assets/css/style.css';

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
          <Item
            key={item.code}
            title={item.title}
            isSelected={item.selected} 
            code={item.code}
            onClick={() => store.selectItem(item.code)}
            onDelete={() => store.deleteItem(item.code)}
          />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
