import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import BasketItem from "../basket-item";
import './style.css';

function BasketList(props) {
  const cn = bem('BasketList');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <BasketItem item={item} onDelete={props.onBasketItemDelete}/>
      </div>
    )}
    </div>
  )
}

BasketList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onBasketItemDelete: propTypes.func
}

BasketList.defaultProps = {
  items: [],
  onBasketItemDelete: () => {}
}

export default React.memo(BasketList);
