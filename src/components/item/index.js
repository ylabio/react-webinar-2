import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const triggerCallback = useCallback((e) => {
    e.stopPropagation()
    props.onClickCallback(props.item.code)
  },[props.onClickCallback, props.item] )

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString() + ' ₽'}
      </div>
      {props.actionType === "Удалить" &&
        <div className={cn('amount')}>
          {props.item.amount} шт
        </div>}
      <div className={cn('actions')}>
        <button onClick={triggerCallback}>
          {props.actionType}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClickCallback: propTypes.func.isRequired,
  actionType: propTypes.string.isRequired
}

Item.defaultProps = {
  item: [],
  actionType: "",
}

export default React.memo(Item);
