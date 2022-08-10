import plural from 'plural-ru';
import React from 'react';
import propTypes from 'prop-types';
import {getPrice} from '../../utils';
import Button from '../button';
import style from './style.css';

const getContentTotal = (sum, count) => {
  return count ? ` ${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${getPrice(sum)}` : 'Пусто'
};

function ModalPreview({sum, count, onTransition}){
  return (
    <div className='ModalPreview'>
      В корзине:
      <span className='ModalPreview-total'> {getContentTotal(sum, count)} </span>
      <Button callback={onTransition} title='Перейти' />
    </div>
  )
}

ModalPreview.propTypes = {
  onTransition: propTypes.func,
  sum: propTypes.number,
  count: propTypes.number
}

ModalPreview.defaultProps = {
  onTransition: () => {}
}

export default ModalPreview;
