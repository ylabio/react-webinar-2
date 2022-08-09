import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import List from "../list";
import Layout from "../layout";

function Cart({cartItems, totalPrice, deleteFromCart}) {
  const [isOpenModal, setOpenModal] = useState(false)
  return (
    <div className='cart'>
      <div>В корзине:</div>
      <div className='price'> {
        cartItems.length !== 0 ?
          `${cartItems.length} ${plural(cartItems.length, 'товар', 'товарa', 'товаров')} / ${totalPrice} ₽`
          : 'пусто'}
      </div>
      <button onClick={() => setOpenModal(true)}>Перейти</button>
      {isOpenModal &&
        <div className='modal-background'>
          <Layout isModal={true} setOpenModal={setOpenModal} head={<h1>Корзина</h1>}>
            <List isCart={true} items={cartItems} onAddDeleteToCart={deleteFromCart}/>
            {cartItems.length !== 0 &&
              <div className='modal-allPrice'>
                <div className='modal-text'>Итого</div>
                <div className='modal-text'>{totalPrice} ₽</div>
              </div>
            }
          </Layout>
        </div>
      }
    </div>
  )
}

Cart.propTypes = {
  cartItems: propTypes.array.isRequired,
  totalPrice: propTypes.number.isRequired,
  deleteFromCart: propTypes.func.isRequired
}

Cart.defaultProps = {
  deleteFromCart: () => {
  } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Cart);
