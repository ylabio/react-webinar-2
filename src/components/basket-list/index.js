import React from 'react';
import propTypes from 'prop-types';
import BasketItem from "../basket-item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function BasketList(props) {
  const cn = bem('BasketList');

  return (
    <div className={cn()}>{props.items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <BasketItem item={item} number={index + 1} onDelete={props.onBasketItemDelete}/>
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
