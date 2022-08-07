import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {getTotal} from '../../utils';

function Controls({onShowCart, cartInfo}){
  const total = getTotal(cartInfo).toLocaleString('ru-RU');

  return (
    <div className='Controls'>
      <span>В корзине: <b>{cartInfo.length !== 0 ? <>{cartInfo.length} {plural(cartInfo.length, 'товар', 'товара', 'товаров')} / {total} ₽</> : "Пусто"}</b></span>
      <button onClick={onShowCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
