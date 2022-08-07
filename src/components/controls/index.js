import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({ basket, onClick }){
  const cn = bem('Controls');

  const callbacks = {
    onClick: useCallback(() => {
      onClick(true);
    }, []),
  };

  const getQuantityProducts = () => {
    if (basket.length) {
      const price = basket.reduce((sum, product) => sum + product.price * product.count, 0);
      
      return `${plural(
        basket.length, 
        '%d товар', '%d товара', '%d товаров'
        )} / ${price.toLocaleString('ru-RU', { 
        style: 'currency', 
        currency: 'RUB', 
        minimumFractionDigits: 0 
      })}`
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
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  onClick: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  basket: [],
  onClick: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
