import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({ code, title, price, addItem }) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {code}
      </div>
      <div className={cn('title')}>
        {title}
      </div>
      <div className={cn('price')}>
        {`${price.toLocaleString()} ₽`} 
      </div>
      <div className={cn('actions')}>
        <button onClick={addItem}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  code: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  addItem: propTypes.func.isRequired,
}

Item.defaultProps = {
  addItem: () => {},
}

export default React.memo(Item);
