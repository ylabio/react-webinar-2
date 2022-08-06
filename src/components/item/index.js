import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({ item, index, button, buttonText }) {
  const cn = bem('Item');

  const callbacks = {
    button: useCallback(
      (event) => {
        event.stopPropagation();
        button(item.code);
      },[button, item],
    )
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {index}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {`${item.price.toLocaleString('ru')} ₽`}
      </div>
      {
        item.amount &&
        <div className={cn('amount')}>
          {`${item.amount} шт`}
        </div>
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.button}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number,
  button: propTypes.func,
  buttonText: propTypes.string
}

Item.defaultProps = {
  index: 0,
  button: () => {},
  buttonText: 'Кнопка'
}

export default React.memo(Item);
