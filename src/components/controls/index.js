import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';

function Controls({shoppingCart, switchCart}){
  const cn = bem('Controls');
  const getShoppingCartStats = useCallback(() => {
    if (shoppingCart.length > 0) {
      let amount = 0, price = 0
      shoppingCart.forEach((item) => {
        amount += item.amount
        price += item.price * item.amount
      })
      return String(amount) + " " + plural(amount, "товар", "товара", "товаров") + " / " + price.toLocaleString() + " ₽"
    } else {
      return "пусто"
    }
  }, [shoppingCart])
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
      </div>
      <div className={cn('cart')}>
        {getShoppingCartStats()}
      </div>
      <div className={cn('actions')}>
        <button onClick={switchCart} disabled={shoppingCart.length === 0}>Перейти</button>
      </div>
    </div>

  )
}

Controls.propTypes = {
  shoppingCart: propTypes.array.isRequired, // Обязательное свойство - массив объектов в корзине
  switchCart: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  shoppingCart: [],
}

export default React.memo(Controls);
