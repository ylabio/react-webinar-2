import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';

function Controls({ count, total, buttonTitle, onClick }) {
  return (
    <div className="Controls">
      <span>В корзине:
        <strong>
          {count
            ? `${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${total} \u20bd`
            : 'пусто'}
        </strong>
      </span>
      <button onClick={onClick}>
        {buttonTitle}
      </button>
    </div>
  );
}

Controls.propTypes = {
  count: propTypes.number.isRequired,
  total: propTypes.string.isRequired,
  buttonTitle: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

export default Controls;
