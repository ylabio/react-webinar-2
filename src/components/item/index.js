import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, buttonAction}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price.toLocaleString("ru-RU")} ₽
      </div>
      <div className={cn('actions')}>
          <button onClick={() => buttonAction(item)}>
            Добавить
          </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object,
  buttonAction: propTypes.func
}

Item.defaultProps = {
  item: {}
}

export default React.memo(Item);
