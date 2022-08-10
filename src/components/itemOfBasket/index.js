import { func } from "prop-types";
import React, {useCallback} from "react";
import {cn as bem}  from "@bem-react/classname";
import propTypes from 'prop-types';
import style from './style.css'
function ItemOfBasket (props) {
  const cn = bem('ItemOfBasket');

  const callbacks = {
    deleteItemInBasket: useCallback(() => {
      props.deleteItemInBasket(props.item),[]
    })
  };
  
  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${props.item.price} ₽`}
      </div>
      <div className={cn('count')}>
        {`${props.item.count} шт`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.deleteItemInBasket}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemOfBasket.propTypes = {
  addItemInBasket: propTypes.func.isRequired,
  title:propTypes.string,
  price: propTypes.number,
}

ItemOfBasket.defaultProps = {
  addItemInBasket: () => {},
  // title:'',
  // price: 0,
}

export default React.memo(ItemOfBasket);
