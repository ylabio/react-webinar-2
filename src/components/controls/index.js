import React from 'react';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import propTypes from "prop-types";

import './style.css';

function Controls({setIsModalActive, totalPrice, totalCount}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('text')}>В корзине:</span>
      {totalCount > 0 ?
        <span className={cn('itemCount')}>
          {totalCount} {plural(totalCount, 'товар', 'товара', 'товаров')} / {totalPrice} ₽
        </span>
        :
        
        <span className={cn('itemCount')}>пусто</span>
      }
      <button onClick={() => setIsModalActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number,
  totalCount: propTypes.number,
  setIsModalActive: propTypes.func
}

Controls.defaultProps = {
  totalPrice: 0,
  totalCount: 0,
  setIsModalActive: () => {
  }
}

export default React.memo(Controls);
