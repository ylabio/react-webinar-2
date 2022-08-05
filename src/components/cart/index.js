import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import ItemInCart from "../item-in-cart";
import './style.css';

function Cart(props) {
  const cn = bem('Item');

  const callbacks = {
    onClose: useCallback(() => {
      props.onClose();
    }, [props.onClose]),
    onItemDelete: useCallback((code) => {
      props.onItemDelete(code);
    }, [props.onItemDelete]),
  };

  return (
    <div className='Cart'>
      <h1>Корзина</h1>
      <button onClick={callbacks.onClose}>Закрыть</button>
      <ul>
        {props.itemsInCart.length > 0 &&
          props.itemsInCart.map((item) =>
            <li key={item.code}>
              <ItemInCart itemInCart={item} onItemDelete={callbacks.onItemDelete} />
            </li>)}
      </ul>
      <div>Итого</div>
    </div>
  )
}

Cart.propTypes = {
  itemsInCart: propTypes.arrayOf(propTypes.object).isRequired,
  onCartClose: propTypes.func.isRequired, // Обязательное свойство - функция
  onItemDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
  itemsInCart: [],
  onCartClose: () => {}, // Значение по умолчанию - функция-заглушка
  onItemDelete: () => {}
}

export default React.memo(Cart);