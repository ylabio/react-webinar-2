import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';

function Controls({ totalPrice, totalCount, cartItems, onOpenCart }) {
  return (
    <div className='Controls'>
      <p>
        В корзине:
        <b>
          {cartItems.length > 0
            ? `${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')} / ${totalPrice} ₽`
            : 'пусто'}
        </b>
      </p>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCart: propTypes.func.isRequired, // Обяхательное свойство - функция
};

Controls.defaultProps = {
  onOpenCart: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
