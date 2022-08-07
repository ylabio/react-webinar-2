import React from 'react';
import CartList from "../cart-list";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

const Cart = ({cartList, onClosePanel, onDeleteItem}) => {
  const cn = bem('Cart');
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>Корзина</h1>
          <button className={cn('btn')} onClick={onClosePanel}>Закрыть</button>
        </div>
        {cartList.length > 0 ? (
          <CartList items={cartList} onDeleteItem={onDeleteItem} className={cn("list")}/>
        ) : (<h2 style={{textAlign: 'center'}}>Корзина пуста</h2>)}
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartList: propTypes.array.isRequired,
  onClosePanel: propTypes.func.isRequired,
  onDeleteItem: propTypes.func.isRequired,
}
Cart.defaultProps = {
  cartList: [],
  onClosePanel: () => {},
  onDeleteItem: () => {},
}

export default React.memo(Cart)