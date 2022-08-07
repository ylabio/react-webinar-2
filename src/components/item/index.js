import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {

    onCartItems: useCallback((e) => {
      props.onCartItems(props.item.code)
    }, [props.onCartItems,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title} 
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onCartItems}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onCartItems: propTypes.func.isRequired
}

Item.defaultProps = {
  onCartItems: () => {}
}

export default React.memo(Item);
