import React from 'react';
import Item from '../item';
import ListErr from '../list-err';
import CartTotal from '../cart-total';
import './style.css';

// state === store.getState().cart
const Cart = ({ state, btnAction, itemAction }) => {
  return (
    <div className='cart'>
      <div className='cart__head'>
        <h1>Корзина</h1>
        <button onClick={btnAction}>Закрыть</button>
      </div>
      {state.items.length > 0 ? <>
        <ul>{state.items.map(item =>
          <Item
            key={item.code}
            code={item.code}
            title={item.title}
            param={item.price + " ₽"}
            param2={item.count + ' шт'}
            btnText='Удалить'
            btnAction={itemAction} />
        )}</ul>
        <CartTotal noCount price={state.totalPrice} count={state.totalPrice} className='cart__total' />
      </>
      : <ListErr message='Корзина пуста' />}
    </div>
  )
};

Cart.defaultProps = {
  btnAction: () => {},
  itemAction: () => {}
};

export default React.memo(Cart);