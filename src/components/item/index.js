import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback((event) => {
      event.stopPropagation();
      props.itemClickHandler(props.item.code);
    }, [props.onClick, props.item]),
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
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      {props.item.amount &&
        <div className={cn('amount')}>
          {props.item.amount} шт
        </div>
      }

      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onClick}>
        {props.buttonText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemClickHandler: propTypes.func.isRequired,
}

Item.defaultProps = {
  itemClickHandler: () => {},
}

export default React.memo(Item);
