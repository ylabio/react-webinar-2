import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback } from 'react';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAction: useCallback(() => {
      props.onAction(props.item.code)
    }, [props.onAction,  props.item])
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
        {props.item.price.toLocaleString('ru-RU') + " ₽"}
      </div>
      <div className={cn('count')}>
        {props.item.count ? props.item.count + " шт" : null}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAction} className={cn('button')}>
          {props.label}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  label: propTypes.string.isRequired,
  onAction: propTypes.func.isRequired
}

Item.defaultProps = {
  label: "Button",
  onAction: () => {}
}

export default React.memo(Item);