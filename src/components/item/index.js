import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
<<<<<<< HEAD
import numberFormat from "../../utils/numberFormat";
=======
>>>>>>> 5d46993e8f3051dce5f134bd1e18da55865a61c5
import './style.css';
import { currencyFormat } from '../../utils';

function Item({item, onAddToCart}) {
  const cn = bem('Item');

  const callbacks = {
<<<<<<< HEAD
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
=======
    onAddToCart: useCallback((e) => {
      e.stopPropagation();
      onAddToCart(item)    
    }, [onAddToCart,  item])
>>>>>>> 5d46993e8f3051dce5f134bd1e18da55865a61c5
  };

  const modifiedPrice = currencyFormat(item.price, 0);

  return (
<<<<<<< HEAD
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
=======
    <div className={cn()} >
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
         {item.title}   
      </div>
      <div className={cn('price')}>
        {modifiedPrice}
      </div>   
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onAddToCart}>
          Добавить
        </button>
>>>>>>> 5d46993e8f3051dce5f134bd1e18da55865a61c5
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
<<<<<<< HEAD
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
=======
  onAddToCart: propTypes.func.isRequired, 
>>>>>>> 5d46993e8f3051dce5f134bd1e18da55865a61c5
}

export default React.memo(Item);
