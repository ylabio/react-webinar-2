<<<<<<< HEAD
import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
=======
import React from 'react';
import {counter, selectCountCondition} from './utils.js';
import './style.css';
import plural from 'plural-ru'
>>>>>>> master

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
<<<<<<< HEAD
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
=======
    <div className='App'>
      <div className='App__head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='Controls'>
        <button
          onClick={() => {
            const code = counter();
            store.createItem({code, title: `Новая запись ${code}`});
          }}> Добавить </button>
      </div>
      <div className='App__center'>
        <div className='List'>
          {items.map((item) => (
            <div key={item.code} className='List__item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className='Item__number'>{item.code}</div>
                <div className='Item__title'>
                  {item.title}
                  {item.selectCount !== 0 && ` | Выделялся ${plural(item.selectCount, ' %d раз', ' %d раза', ' %d раз')}`}
                </div>
                <div className='Item__selectCounter'></div>
                <div className='Item__actions'>
                  <button onClick={() => store.deleteItem(item.code)}> Удалить </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
>>>>>>> master
  );
};

export default App;
