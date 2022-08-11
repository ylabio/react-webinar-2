import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');
  
  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          
          item={item}
          basket={props.basket}
          onAddItemInBasket={props.onAddItemInBasket}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  
  onAddItemInBasket: propTypes.func.isRequired,
}



export default React.memo(List);
