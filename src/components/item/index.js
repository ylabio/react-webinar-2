import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {formatNumber} from '../../utils.js';


function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    addItem: useCallback(() => {
      props.addItem(props.item);
    }, [props.addItem, props.item]),
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
        {formatNumber(props.item.price) + " ₽"} 
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.addItem}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItem: propTypes.func.isRequired,
}

Item.defaultProps = {
  item: {},
  addItem: () => {},
}

export default React.memo(Item);
