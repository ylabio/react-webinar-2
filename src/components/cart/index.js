import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import Layout from "../layout";
import List from "../list";

function Cart(store) {
  const cn = bem('Cart');

  return (
    <Layout head={
      <>
        <h1>Корзина</h1>
        <button>Закрыть</button>
      </>
    }>
      <List items={store.store.getState().cartItems}
            buttonText={'Удалить'}/>
    </Layout>
  )
}

Cart.propTypes = {}

Cart.defaultProps = {}

export default React.memo(Cart);