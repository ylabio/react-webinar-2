import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem({cartItem,handleDeleteCartItem}) {
  const cn = bem('CartItem');
  
  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {cartItem.code}
      </div>
      <div className={cn('title')}>
        {cartItem.title}
      </div>
      <div className={cn('actions')}>
        {/*&nbsp - это неразрывный пробел(иначе, при обычном пробеле идет перенос строки)*/}
        <span className={cn('price')}>{cartItem.price * cartItem.quantity}&nbsp;₽</span>
        <span className={cn('quantity')}>{cartItem.quantity}&nbsp;шт.</span>
        <button onClick={()=>handleDeleteCartItem(cartItem.code)}>Удалить</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {}

CartItem.defaultProps = {}

export default React.memo(CartItem);
