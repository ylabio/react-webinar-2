import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {getTotalPrice} from '../../utils.js';
import './style.css';

function Controls({onOpenBucket, bucketItems}){
  const bucketTotalPrice = getTotalPrice(bucketItems);
  const bucketAmountItems = bucketItems.length;
  const bucketInfo = bucketTotalPrice || bucketAmountItems
    ? `${bucketAmountItems} ${plural(bucketAmountItems, 'товар', 'товара', 'товаров')} / ${bucketTotalPrice.toLocaleString('ru-RU')} ₽`
    : 'пусто';
  return (
    <div className='Controls'>
      <div className='Controls-title'>В корзине: </div>
      <div className='Controls-info'>{bucketInfo}</div>
      <button className='Controls-btn' onClick={onOpenBucket}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenBucket: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onOpenBucket: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
