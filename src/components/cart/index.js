import React from 'react'
import propTypes from 'prop-types';
import './style.css'

const Cart = ({ items, isModalOpen, closeModal, removeItem, total }) => {
  return (
    <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
      <div className='cart'>
        <div className='cart__header'>
          <h2>Корзина</h2>
          <button onClick={closeModal}>Закрыть</button>
        </div>

        {items.map(({code, title, price, amount}, i) => 
          <div key={code} className='cart__item'>
            <div className="cart__item_number">
              {i + 1}
            </div>
            <div className="cart__item_title">
              {title}
            </div>
            <div className="cart__item_price">
            {`${price.toLocaleString()} ₽`}
            </div>
            <div className="cart__item_amount">
              {`${amount} шт`}
            </div>
            <div className="cart__item_actions">
              <button onClick={() => removeItem(code)}>Удалить</button>
            </div>
          </div>
        )}

        {total !== 0 && <div className="cart__total"><div>Итого</div> <span>{total.toLocaleString()} ₽</span> </div>}
      </div>
    </div>
  )
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isModalOpen: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
  total: propTypes.number.isRequired,
}

Cart.defaultProps = {
  closeModal: () => {},
  removeItem: () => {},
}

export default React.memo(Cart)
