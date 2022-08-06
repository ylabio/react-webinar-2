import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import Layout from "../layout";
import {getAllCartItemsCost} from "../../utils";

function Modal({isModalActive, closeModal, cartItems, deleteCartItems, children}) {
  const cn = bem('Modal');
  const a = bem('active');

  return (
    <div className={isModalActive ? cn(null, [a()]) : cn()} onClick={closeModal}>
      <div className={isModalActive ? cn('content', [a()]) : cn('content')} onClick={closeModal}>
        {/*{children}*/}
        <Layout head={
          <>
            <h1>Корзина</h1>
            <button onClick={closeModal}>Закрыть</button>
          </>
        }>
          <List items={cartItems}
                button={deleteCartItems}
                buttonText={'Удалить'}/>
          {cartItems.length
            ? <div className={cn('total-price')}>
              <strong>
                <span>Итого</span>
                <span>{`${getAllCartItemsCost(cartItems).toLocaleString('ru')} ₽`}</span>
              </strong>
            </div>
            : ''}
        </Layout>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isModalActive: propTypes.bool,
  closeModal: propTypes.func.isRequired,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  deleteCartItems: propTypes.func,
  children: propTypes.node
}

Modal.defaultProps = {
  isModalActive: false,
  closeModal: () => {},
  cartItems: [],
  deleteCartItems: () => {},
  children: ''
}

export default React.memo(Modal);