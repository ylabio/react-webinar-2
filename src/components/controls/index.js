import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import { plural, formatCurrency } from '../../utils';


function Controls({openModal, count, totalPrice, basketItems}){

  const cn = bem('Controls');

  return (
    <div className = {cn()}>
      <p className = {cn('label')}>В корзине:</p>
      <h4 className = {cn('info')}>
        {
          count && basketItems.length > 0
        ?
          count + " " + plural(count, 'товар', 'товара', 'товаров') + " / " + formatCurrency(totalPrice)
        :
          <h4 className = {cn('empty')}>пусто</h4>
        }
      </h4>
      <button onClick = {openModal} className = {cn('go-button')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired, // Обязательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
