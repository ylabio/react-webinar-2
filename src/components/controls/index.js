import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Button } from '../button';
import { calcSumm, declOfNum } from '../../utils';
import { Cart } from '../cart';

function Controls({ cartItems, showCart, onShowCart, deleteItemToCart }) {
  let quantity = calcSumm(cartItems, 'quantity');
  let unicalCount = calcSumm(cartItems,"unicalCount")

  return (
  <div className='Controls'>
      <div className="heading-mini">В корзине:</div>
      <div>
        {!quantity 
        ? ( <span className="cart-text">пусто</span>)
        : (<div className="cart-text">
            {unicalCount} {declOfNum(unicalCount, ["товар", "товара", "товаров"])} /{" "}
            <span>{calcSumm(cartItems, "price").toLocaleString()}&nbsp;₽</span>
          </div>)}
      </div>
      {showCart && (
        <Cart
          cartItems={cartItems}
          onShowCart={onShowCart}
          deleteItemToCart={deleteItemToCart}
        />
      )}
      <Button class="controls-btn" text="Перейти" onClick={onShowCart} />
</div>
  )
}

Controls.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  onShowCart: propTypes.func.isRequired,
  deleteItemToCart: propTypes.func.isRequired,
};

Controls.defaultProps = {
  cartItems: [],
  onShowCart: () => {}, // Значение по умолчанию - функция-заглушка
  deleteItemToCart: () => {},
};

export default React.memo(Controls);
