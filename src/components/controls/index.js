import React from 'react';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';
import propTypes from 'prop-types';
import './style.css';

function Controls(props) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('description')}>В корзине: </p>
      <p className={cn('product')}>
        {props.quantityProduct ? ` ${props.quantityProduct} ${plural(props.quantityProduct, 'товар', 'товара', 'товаров')}` : 'пусто'}
        {props.quantityProduct ? ` / ${props.totalSum}` : null}
      </p>
      <button className={cn('button')} onClick={props.onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalSum: propTypes.string.isRequired,
  quantityProduct: propTypes.number.isRequired,
  onOpenModal: propTypes.func.isRequired,
}

export default React.memo(Controls);
