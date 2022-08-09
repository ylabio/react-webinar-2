import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import Button from '../button';
import Cart from '../cart'
import { calcPrice, calcQuantity, calcUnicalItems } from '../../utils';

function Controls({ cartItems, showCart, onShowCart, deleteItemToCart }) {
  let quantity = calcQuantity(cartItems);
  let unicalCount = calcUnicalItems(cartItems)

  return (
    <div className='Controls'>
      <div className="heading-mini">В корзине:</div>
      <div>
        {!quantity
        ? ( <span className="cart-text">пусто</span>)
        : (<div className="cart-text">
            {unicalCount} {plural(unicalCount, "товар", "товара", "товаров")} /{" "}
            <span>{calcPrice(cartItems)}&nbsp;₽</span>
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
