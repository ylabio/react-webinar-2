import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CustomButton from '../custom-button';
import './style.css';

function Basket({children, basketCount, totalSum, setModal}) {
  const cn = bem('Basket');
  
  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h1>Корзина</h1>
        <span className={cn('head-button')}>
          <CustomButton onClick={() => setModal(false)}>Закрыть</CustomButton>
        </span>
      </div>
      {basketCount ?
        <>
          {children}
          <div className={cn('summary')}>
            <span>Итого</span>
            <span>{totalSum} &#8381;</span>
          </div>
        </> :
        <div className={cn('empty')}>Нет товаров</div>
      } 
    </div>
  )
}

Basket.propTypes = {
  children: propTypes.node.isRequired,
  basketCount: propTypes.number.isRequired,
  totalSum: propTypes.number.isRequired,
  setModal: propTypes.func.isRequired
}

export default Basket;