import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import {currency} from '../../utils.js';
import './style.css';

function Controls({ quantityAndAmountProducts, onClick }){
  const cn = bem('Controls');

  const callbacks = {
    onClick: useCallback(() => {
      onClick(true);
    }, []),
  };

  const getQuantityProducts = () => {
    if (quantityAndAmountProducts.quantity) {
      return `${plural(
        quantityAndAmountProducts.quantity, 
        '%d товар', '%d товара', '%d товаров'
        )} / ${currency(quantityAndAmountProducts.amount)}`
    }

    return 'пусто'
  }

  return (
    <div className={cn()}>
      <p className={cn('basket')}>В корзине:
        <span className={cn('basket', { weight: 'semiBold' })}>{getQuantityProducts()}</span>
      </p>
      <button className={cn('btnOpenModal')} onClick={callbacks.onClick}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  quantityAndAmountProducts: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  quantityAndAmountProducts: {},
  onClick: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
