import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const onClick = useCallback(() => {
    props.onClick(props.item.code)
  }, [props.onClick, props.item])

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString()} ₽
      </div>
      {props.item.count &&
        <div className={cn('count')}>{props.item.count} шт
        </div>
      }
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={onClick}>
          {props.actionName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func,
  actionName: propTypes.string,
}

export default React.memo(Item);
