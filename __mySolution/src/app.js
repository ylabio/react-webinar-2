import React, { useContext } from 'react';
import './style.css';
import Store, { Ctx } from './store.js';
import { ItemActions } from './constants.js';

/**
 * Кнопка добавления
 */
function AddBtn() {
  const { state, dispatch } = useContext(Ctx)
  const handleClick = () => {
    dispatch({
      type: ItemActions.ADD_NEW_ITEM,
      payload: `Новая запись ${state.counter + 1}`
    })
  }
  return (
    <button onClick={handleClick}> 
      Добавить 
    </button>
  )
}

/**
 * Список записей
 */
function ItemList() {
  const { state } = useContext(Ctx)

  return (
    <div className='List'>
      {
        state.items.map(item => 
          <div key={item.code} className="List__item">
            <Item item={item} /> 
          </div>
        )
      }
    </div>
  )
}

/**
 * Супер-крутая запись
 * @param item Наша запись вида, который подсвечивает IDEшка 
 */
function Item({item: {
  code,
  title,
  selected,
  counted
}}) {
  const { dispatch } = useContext(Ctx)

  const handleDelete = (code) => (e) => {
    e.stopPropagation()
    
    dispatch({
      type: ItemActions.DELETE_ITEM,
      payload: code
    })
  }

  const handleClick = (code) => () => {
    dispatch({
      type: ItemActions.CHANGE_ITEM,
      payload: code
    })
  }

  return (
    <div 
      className={'Item' + (selected ? ' Item_selected' : '')}
      onClick={handleClick(code)}
    >
      <div className='Item__number'>{ code }</div>
      <div className='Item__title'>{ `${title}${counted > 0 ? ` | Выделялся ${counted} раз` : ""}` }</div>
      <div className='Item__actions'>
        <button onClick={handleDelete(code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

/**
 * Наше супер-мега крутое приложение
 * @returns Смысл жизни
 */
function App() {
  return (
    // Провайдер контекста, чтобы везде все было хорошо
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