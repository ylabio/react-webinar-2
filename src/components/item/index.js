import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({store, item}) {

  const cn = bem('Item');

  return (
    <div className={cn({'selected': item.selected})} onClick={() => store.selectItem(item.code)}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <button onClick={() => store.deleteItem(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default Item;
