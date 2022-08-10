import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';

function Controls({onShowCart, cartInfo, total, unique}){
  return (
    <div className='Controls'>
      <span>В корзине: <b>{unique !== 0 ? <>{unique} {plural(cartInfo.length, 'товар', 'товара', 'товаров')} / {total.toLocaleString('ru-RU')} ₽</> : "Пусто"}</b></span>
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
