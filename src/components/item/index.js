import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { numberWithSpaces } from "../../utils";

function Item({onAction, item}) {
  const cn = bem('Item');

  const callbacks = {
    onAction: useCallback((e) => {
      e.stopPropagation();
      onAction(item)
    }, [onAction, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {numberWithSpaces(item.price)} ₽
      </div>
      {item.quantity && <div className={cn('quantity')}>{item.quantity} шт</div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.onAction}>
          {item.quantity ? 'Удалить' : 'Добавить'}
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
