import React from 'react';
import './style.css';

function Cart({ cartToggle, cart, totalPrice, cartDelete }) {
  console.log('cart', cart);

  return (
    <div className='cart'>
      <div className='cartInformation'>
        <div className='topBlock'>
          <h1 className='topBlockName'>Корзина</h1>
          <button onClick={cartToggle} className='closeBlockButton'>
            Закрыть
          </button>
        </div>
        <div className='cartItemsBlock'>
          {cart.map((item) => (
            <div key={item.code} className='cartItem'>
              <div className='leftSide'>
                <div className='itemCode text'>{item.code}</div>
                <div className='itemTitle text'>{item.title}</div>
              </div>
              <div className='rightSide'>
                <div className='itemPrice text'>{item.price} ₽</div>
                <div className='itemAmount text'>{item.amount} шт</div>
                <button onClick={() => cartDelete(item.code)} className='delete'>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='total'>
          Итого <span className='price'>{totalPrice} ₽</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
