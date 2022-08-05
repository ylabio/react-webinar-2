import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function BasketList({items, onAddItemToBasket, onDeleteItemToBasket}) {
  const cn = bem('List');

  return (
    <ul className={cn()} style={onDeleteItemToBasket ? {"margin": "74px 0 0 0"} : null}>
      {
        items.map((item, i) =>
          <li key={item.code} className={cn('item')}>
            <Item 
              item={item} 
              serialNumber={i + 1} 
              onAddItemToBasket={onAddItemToBasket} 
              onDeleteItemToBasket={onDeleteItemToBasket}/>
          </li>
        )
      }
    </ul>
  )
}

BasketList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItemToBasket: propTypes.func,
  onDeleteItemToBasket: propTypes.func
}

BasketList.defaultProps = {
  items: []
}

export default React.memo(BasketList);
