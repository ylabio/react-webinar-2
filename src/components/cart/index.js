import React from 'react';
import './style.css';
import propTypes, { object } from 'prop-types';

function Cart({ cutting, cartToggle, cart, totalPrice, cartDelete }) {
  return (
    <div className='cart'>
      <div className='cartInformation'>
        <div className='topBlock'>
          <h1 className='topBlockName'>Корзина</h1>
          <button onClick={cartToggle} className='closeBlockButton'>
            Закрыть
          </button>
        </div>
        <div className={cart.length < 6 ? 'cartItemsBlock' : 'cartItemsBlock overflow'}>
          {cart.map((item) => (
            <div key={item.code} className='cartItem'>
              <div className='leftSide'>
                <div className='itemCode text'>{item.code}</div>
                <div className='itemTitle text'>{item.title}</div>
              </div>
              <div className='rightSide'>
                <div className='itemPrice text'>{cutting(item.price)} ₽</div>
                <div className='itemAmount text'>{item.amount} шт</div>
                <button onClick={() => cartDelete(item.code)} className='delete'>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='total'>
          Итого <span className='price'>{cutting(totalPrice)} ₽</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cutting: propTypes.func.isRequired,
  cartToggle: propTypes.func.isRequired,
  cart: propTypes.arrayOf(object).isRequired,
  totalPrice: propTypes.number.isRequired,
  cartDelete: propTypes.func.isRequired,
};

Cart.defaultProps = {
  cutting: () => {},
  cartToggle: () => {},
  cart: [],
  totalPrice: null,
  cartDelete: () => {},
};
export default React.memo(Cart);
