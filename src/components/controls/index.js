import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';

function Controls(props){
  const cn = bem('Controls');
  const shoppingCartStats = useMemo(() => {
    if (props.itemsInCart > 0) {
      return String(props.itemsInCart) + " " +
        plural(props.itemsInCart, "товар", "товара", "товаров") + " / " + props.cartPrice.toLocaleString() + " ₽"
    } else {
      return "пусто"
    }
  }, [props.itemsInCart, props.cartPrice])
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
      </div>
      <div className={cn('cart-summary')}>
        {shoppingCartStats}
      </div>
      <div className={cn('actions')}>
        <button onClick={props.switchCart} disabled={props.itemsInCart === 0}>Перейти</button>
      </div>
    </div>

  )
}

Controls.propTypes = {
  itemsInCart: propTypes.number.isRequired,
  cartPrice: propTypes.number.isRequired,
  switchCart: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  itemsInCart: 0,
  cartPrice: 0,
}

export default React.memo(Controls);
