import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {getСonvertProps} from '../../utils'

function Controls({toCard, cardsValue}){
  const priceSum = cardsValue.reduce((acc, value) => acc + value.price, 0)

  return (
    <div className='Controls'>
      <p className='Controls__info'>В корзине:
      {Boolean(cardsValue.length) ? <b>{getСonvertProps(cardsValue).length} {plural(getСonvertProps(cardsValue).length, 'товар', 'товара', 'товаров')}/{priceSum} ₽</b> : <b>пусто</b>}</p>
      <button onClick={toCard}>Корзина</button>
    </div>
  )
}

Controls.propTypes = {
  toCard: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  toCard: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
