import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Item from '../item';
import propTypes from 'prop-types';
import {counter} from '../../utils';

const item = {code: counter, title: 'Название товара', price: 100.0, count: 1};

function Modal(props) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('window')}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('button')}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>
          <div className={cn('item')}>
            <Item item={item} btnName={'Удалить'}></Item>
          </div>
          <div className={cn('total')}>
            Итого 
            <span className={cn('total-price')}>
              223 ₽
            </span>
          </div>
        </div>      
      </div>
    </div>
  )
}

export default Modal;