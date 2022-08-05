import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Cart(props) {
  const cn = bem('Item');

  const callbacks = {
    onClose: useCallback(() => {
      props.onClose();
    }, [props.onClose])
  };

  return (
    <div className='Cart'>
      <h1>Корзина</h1>
      <button onClick={callbacks.onClose}>Закрыть</button>
      <ul>
        <li>
          item
        </li>
      </ul>
      <div>Итого</div>
    </div>
  )
}

Cart.propTypes = {
  onCartClose: propTypes.func.isRequired // Обязательное свойство - функция
}

Cart.defaultProps = {
  onCartClose: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Cart);