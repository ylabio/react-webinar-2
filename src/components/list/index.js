import React from 'react';
import item from "../item";

function List({store, item}){
  // Выбор состояния из store
  const {items} = store.getState();

  return (
    <div className='List'>{items.map(item =>
      <div key={item.code} className='List__item'>
        <item item={item} store={store}/>
      </div>
    )}
    </div>
  )
}

export default List;
