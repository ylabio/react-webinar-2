import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    addToCart: useCallback(item => {
      props.addToCart(item);
    }, [props.addToCart])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${(props.item.price).toLocaleString()} \u20BD`}
      </div>
      <div className={cn('actions')}>
        <button onClick={()=>callbacks.addToCart(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  addToCart: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  addToCart: () => {}
}

export default React.memo(Item);
