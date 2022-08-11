import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { numberWithSpaces } from "../../utils";

function Item({actionHandler, item}) {
  const cn = bem('Item');

  const callbacks = {
    onActionHandler: useCallback((e) => {
      e.stopPropagation();
      actionHandler(item.code)
    }, [actionHandler, item])
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
        <button onClick={callbacks.onActionHandler}>
          {item.quantity ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  actionHandler: propTypes.func.isRequired
}

Item.defaultProps = {
  actionHandler: () => {}
}

export default React.memo(Item);
