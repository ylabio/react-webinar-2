import React from 'react';
import propTypes from 'prop-types';
import Layout from "../layout";
import List from "../list";
import './style.css';

function Cart(props) {
  const items = [];
  const cartItem = {};

  for (const element of props.state?.cart?.items) {
    if (cartItem[element.toString()]) {
      cartItem[element.toString()].count++;
    } else {
      cartItem[element.toString()] = {count: 1}
    }
  }

  for (const key in cartItem) {
    const item = props.state?.items.find(item => item.code.toString() === key);
    items.push({code: parseInt(key), title: item.title, details:[item.price.toLocaleString('ru') + " ₽", cartItem[key].count + " шт"]});
  }

  return (
    <Layout head={[<h1>Корзина</h1>, <button onClick={props.onHideModal}>Закрыть</button>]}>
      <List items={items} onButtonEvent={props.onDeleteItems} textButton="Удалить"/>
      {items.length > 0
        ? <div className="Layout-total">
            <span>Итого</span>
            <span>{props.state.cart.total.toLocaleString('ru') + " ₽"}</span>
          </div>
        : <div/>
      }
    </Layout>
  )
}

Cart.propTypes = {
  state: propTypes.object.isRequired,
  onHideModal: propTypes.func.isRequired,
  onDeleteItems: propTypes.func.isRequired,
}

Cart.defaultProps = {
  state: {},
  onHideModal: () => {},
  onDeleteItems: () => {}
}

export default React.memo(Cart);