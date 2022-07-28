import React, { useContext } from 'react';
import './style.css';
import Store, { Ctx } from './store.js';
import { ADD_NEW_ITEM, CHANGE_ITEM, DELETE_ITEM } from './constants.js';

function AddBtn() {
  const { state, dispatch } = useContext(Ctx)
  const handleClick = () => {
    dispatch({
      type: ADD_NEW_ITEM,
      payload: `Новая запись ${state.counter + 1}`
    })
  }
  return (
    <button onClick={handleClick}> 
      Добавить 
    </button>
  )
}

function ItemList() {
  const { state, dispatch } = useContext(Ctx)
  const handleDelete = (code) => () => {
    dispatch({
      type: DELETE_ITEM,
      payload: code
    })
  }

  const handleClick = (code) => () => {
    dispatch({
      type: CHANGE_ITEM,
      payload: code
    })
  }

  return (
    <div className='List'>
      {
        state.items.map(item => 
          <div key={item.code} className="List__item">
            <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={handleClick(item.code)}>
                <div className='Item__number'>{item.code}</div>
                <div className='Item__title'>{`${item.title}${item.counted > 0 ? ` | Выделялся ${item.counted} раз` : ""}`}</div>
                <div className='Item__actions'>
                  <button onClick={handleDelete(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
          </div>
        )
      }
    </div>
  )
}

function App() {
  // Выбор состояния из store

  return (
    <Store>
      <div className='App'>
        <div className='App__head'>
          <h1>Приложение на чистом JS</h1>
        </div>
        <div className='Controls'>
          <AddBtn />
        </div>
        <div className='App__center'>
          <ItemList />
        </div>
      </div>
    </Store>
  );
}

export default App;
