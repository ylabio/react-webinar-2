import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import List from "../list";
import Layout from "../layout";

function Controls({cartItems, totalPrice, deleteFromCart}) {
  const [isOpenModal, setOpenModal] = useState(false)
  const productsInCart = cartItems.reduce((totalCount, {cartCount}) => totalCount += cartCount, 0);
  return (
    <div className='Controls'>
      <div>В корзине:</div>
      <div className='price'> {
        productsInCart !== 0 ?
          `${productsInCart} ${plural(productsInCart, 'товар', 'товарa', 'товаров')} / ${totalPrice} ₽`
          : 'пусто'}
      </div>
      <button onClick={() => setOpenModal(true)}>Перейти</button>
      {isOpenModal &&
        <div className='modal-background' onClick={() => setOpenModal(false)}>
          <Layout isModal={true} setOpenModal={setOpenModal} head={<h1>Корзина</h1>}>
            <List isCart={true} items={cartItems} onAddDeleteToCart={deleteFromCart}/>
            {productsInCart !== 0 &&
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

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {
  } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
