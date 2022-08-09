import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { numberWithSpaces } from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {

    onAction: useCallback((e) => {
      e.stopPropagation();
      props.onAction(props.item)
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
        {numberWithSpaces(props.item.price)} ₽
      </div>
      {props.item.quantity && <div className={cn('quantity')}>{props.item.quantity} шт</div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.onAction}>
          {props.item.quantity ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAction: propTypes.func.isRequired
}

Item.defaultProps = {
  onAction: () => {}
}

export default React.memo(Item);
