import React, { useCallback, useContext, useEffect } from "react";
import ModalLayout from "../../layout/modal-layout";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Button from "../../shared/ui/button";
import { AppContext } from "../../context/app-context";
import { formatPrice, getCartItems } from "../../shared/utils";
import CartItem from "../cart-item";

function Cart() {
  const { store } = useContext(AppContext);
  const {isCartOpen, goods} = store.state;
  const items = getCartItems(store.state.goods.items);
  const cn = bem('Cart');

  const callbacks = {
    closeModal: useCallback(() => {
      store.handleModal(false);
    }, []),

    removeItemFromCart: useCallback((item) => {
      store.removeItemFromCart(item);
    }, []),
  };

  useEffect(() => {
    if (goods.total === 0) {
      callbacks.closeModal();
    }
  }, [goods.total])

  return <ModalLayout>
    <div className={cn()}>
      <header className={cn('header')}>
        <h2 className={cn('headerText')}>Корзина</h2>
          <Button 
            text='Закрыть'
            onClick={callbacks.closeModal}
          />           
      </header>

      <div className={cn('divider')} />

      <main className={cn('goods', {open: isCartOpen})}>
        <ul>
          {items.map(item => (
            <CartItem 
              item={item} 
              key={item.data.code} 
              removeItemFromCart={callbacks.removeItemFromCart}
            />
          ))}
        </ul>       

        <div className={cn('total')}>
          <span>Итого</span>
          <span>{formatPrice(goods.price) + ' ₽'}</span>
        </div>         
      </main> 
    </div>
  </ModalLayout>
}

export default Cart;