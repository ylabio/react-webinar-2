import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, addItemInBasket}) {
  const cn = bem('List');

  return (
      <div className={cn()}>{items.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item code={item.code} price={item.price} onCLickButton={addItemInBasket} title={item.title}
                  titleButton='добавить'/>
          </div>
      )}
      </div>
  )
}


export default React.memo(List);
