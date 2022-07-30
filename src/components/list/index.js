import React from 'react';
import Item from "../item";
import './style.css';

function List({store, item}){
  // Выбор состояния из store
  const {items} = store.getState();

  return (
    <div className='List'>{items.map(item =>
      <div key={item.code} className='List-item'>
        <Item item={item} store={store}/>
      </div>
    )}
    </div>
  )
}

export default List;
