import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import {getPriceOnRub, getAllPrice} from '../../utils';
import './style.css';

function Controls({items, openPopup}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('cart')}>
        В корзине:
        <span className={cn('cart-info')}>
         {getAllPrice(items) === 0 ? 'пусто' :
          `${items.length} ${plural(items.length, 'товар', 'товара', 'товаров')} /  ${getPriceOnRub(getAllPrice(items))}`
         }
        </span>
      </p>
      <button onClick={openPopup}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  openPopup: propTypes.func.isRequired
}

Controls.defaultProps = {
  items: [],
  openPopup: () => {}
}

export default React.memo(Controls);
