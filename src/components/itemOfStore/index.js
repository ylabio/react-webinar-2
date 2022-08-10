import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function ItemOfStore(props) {
  
  const cn = bem('ItemOfStore');

  const callbacks = {
    addItemInBasket: useCallback(() => {
      props.addItemInBasket(props.item),[]
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
      <div className={cn('actions')}>
        <button onClick={callbacks.addItemInBasket}>
          Добавить
        </button>
      </div>
    </div>
  )
}

ItemOfStore.propTypes = {
  addItemInBasket: propTypes.func.isRequired,
  title:propTypes.string,
  price: propTypes.number,
}

ItemOfStore.defaultProps = {
  addItemInBasket: () => {},
  // title:'',
  // price: 0,
}

export default React.memo(ItemOfStore);
