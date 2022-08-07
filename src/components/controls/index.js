import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru'
import './style.css';

function Controls({ openModal, total, amount }){
  return (
    <div className='Controls'>
      <div>В корзине: <span>
        {amount ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${total.toLocaleString()} ₽` : 'пусто'}
      </span>
      </div>
      <button onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  total: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
  openModal: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  openModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
