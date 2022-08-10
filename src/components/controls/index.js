import React from 'react';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import propTypes from "prop-types";

import './style.css';
import {priceFormat} from "../../utils";

function Controls({setIsCartModalActive, totalPrice, totalUniqueCount}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('text')}>В корзине:</span>
      {totalUniqueCount > 0 ?
        <span className={cn('itemCount')}>
          {totalUniqueCount} {plural(totalUniqueCount, 'товар', 'товара', 'товаров')} / {priceFormat(totalPrice)} ₽
        </span>
        :
        
        <span className={cn('itemCount')}>пусто</span>
      }
      <button onClick={() => setIsCartModalActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number,
  totalUniqueCount: propTypes.number,
  setIsCartModalActive: propTypes.func
}

Controls.defaultProps = {
  totalPrice: 0,
  totalUniqueCount: 0,
  setIsCartModalActive: () => {}
}

export default React.memo(Controls);
