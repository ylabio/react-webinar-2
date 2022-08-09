import React from 'react';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

const TEXT_BUTTON_ADD = 'добавить'

function List({items, addItemInBasket}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map((item,i) =>
      <div key={item.code} className={cn('item')}>
        <Item place={i+1} code={item.code} price={item.price} onCLickButton={addItemInBasket} title={item.title}
              titleButton={TEXT_BUTTON_ADD}/>
      </div>
    )}
    </div>
  )
}


export default React.memo(List);
