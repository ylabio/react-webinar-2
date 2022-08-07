import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Modal } from './modal';

function Controls({ onItemDeleteFromCart, cart, priceSum }) {

  const [openModal, setOpenModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  React.useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0)
    );
  }, [cart]);

  return (
    <div className='Controls'>
      {
        totalPrice === 0 ? <span>В корзине: <b>Пусто</b> </span> : <span>В корзине: <b>{cart.length} товар</b> / <b>{totalPrice} ₽</b></span>
      }
      {
        openModal && <Modal
          onItemDeleteFromCart={onItemDeleteFromCart}
          key={cart.code}
          totalPrice={totalPrice}
          cart={cart}
          setOpenModal={setOpenModal}
          priceSum={priceSum}
        />

      }
      {
        !openModal &&
        <button onClick={() => setOpenModal(true)}>Перейти</button>
      }
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция

}

Controls.defaultProps = {
  onAdd: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
