import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';

function Controls({ totalPrice, cartItems, onOpenCart }) {
  return (
    <div className='Controls'>
      <p>
        В корзине:
        <b style={{ marginLeft: '15px' }}>
          {cartItems.length > 0
            ? `${cartItems.length} ${plural(
                cartItems.length,
                'товар',
                'товара',
                'товаров',
              )} / ${totalPrice}`
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
