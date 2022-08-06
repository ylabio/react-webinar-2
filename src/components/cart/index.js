import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Popup from '../popup';
import Layout from '../layout';
import Item from '../item';

function Cart({setOpenCart, removeFromCart, isOpenCart, state, totalPrice}){
    const cn = bem('Cart');

    if (!isOpenCart) return

    const { items, cart } = state

    const getItems = () => {
      let count = 0;
      let elements = [];
      for (let prop in cart) {
        count++
        elements.push(
        <div key={prop} className={cn('item')}>
          <Item item={items.find(el => el.code == prop)}
                count={count}
                amount={cart[prop]}
                actionName="Удалить"
                action={() => removeFromCart(prop)}
          />
        </div>);     
      }
      return elements;
    }
  
    return (
      <Popup close={() => setOpenCart(false)}>
        <Layout className={cn()} 
                head={<h1>Корзина</h1>}
                btn={<button onClick={() => setOpenCart(false)} className='Layout-btn'>
                Закрыть
              </button>}
        >

          { getItems() }

          <div className={cn('total')}>
            <span>Итого</span>
            {totalPrice.toLocaleString('ru')} ₽
          </div>

        </Layout>
      </Popup>
    )
  }
  
  Cart.propTypes = {
    state: propTypes.object,
    setOpenCart: propTypes.func.isRequired,
    removeFromCart: propTypes.func.isRequired,
    isOpenCart: propTypes.bool.isRequired,
  }
  
  Cart.defaultProps = {
    items: {},
    setOpenCart: () => {},
    removeFromCart: () => {},
    isOpenCart: false,
  }
  
  export default React.memo(Cart);