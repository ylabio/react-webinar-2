import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

function Controls({openPopup, countAndSumCart}){
  const cn = bem('Controls');

  const cb = {
    openPopup: useCallback((e) => {
      e.stopPropagation();
      openPopup(true);
    }, []),
    showSum: useCallback(() => {
      const Cart = countAndSumCart();
      return Cart.sum;
    }, []),
    showCount: useCallback(() => {
      const Cart = countAndSumCart();
      return Cart.count;
    }, []),
  };

  return (
    <div className={cn()}>
        <div className={cn('information')}>
          <div className={cn('text')}>
            В корзине:
          </div>
          <div className={cn('calc')}>
            {cb.showCount()
              ? ` ${cb.showCount()} ${plural(cb.showCount(), 'товар', 'товара', 'товаров')} 
                / ${cb.showSum().toLocaleString('ru-RU')} ₽`
              : ' пусто'}
          </div>
        </div>
      <button onClick={cb.openPopup}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openPopup: propTypes.func.isRequired,
  countAndSumCart: propTypes.func.isRequired,
}

Controls.defaultProps = {
  openPopup: () => {},
  countAndSumCart: () => {},
}

export default React.memo(Controls);