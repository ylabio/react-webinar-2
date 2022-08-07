import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';

function Controls({onAdd, cartItems}) {
  const numberOfitems = cartItems.length;
  const itemPlural = plural(numberOfitems, 'товар', 'товара', 'товаров');
  const roubleSign = `\u20BD`;

  return (
    <div className="Controls">
      <p>
        В корзине:{' '}
        <span>
          {numberOfitems
            ? `${numberOfitems} ${itemPlural} / 223 ${roubleSign}`
            : `пусто`}
        </span>
      </p>
      <button onClick={onAdd}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
};

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
