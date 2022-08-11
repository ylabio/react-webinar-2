import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from "@bem-react/classname";
import numeral from 'numeral';
import './style.css';

function Controls({ showModal, totalCount, totalPrice }) {
  const cn = bem('Cart');
  return (
    <div className='Controls'>
      <div className={cn('total')}>
        В корзине:
        <strong>
          {totalCount ? `  ${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString()} ₽` : `  пусто `}
        </strong>
      </div>
      <button onClick={showModal}> Перейти </button>
    </div>
  )
}

Controls.propTypes = {
  onClick: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onClick: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
