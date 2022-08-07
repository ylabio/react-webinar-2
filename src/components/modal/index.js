import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import List from '../list'
import Item from '../item';
import {getCurrencyPrice} from '../../utils';
import propTypes from 'prop-types';


function Modal(props) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('window')}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('button')} onClick={props.onChangeModal}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {!props.items.length
            ? <p style={{textAlign: 'center', fontWeight: '700'}}>Товаров нет</p> 
            : <>
                {props.items.map((item) => 
                  <div className={cn('item')} key={item.code}>
                    <Item item={item} btnName={'Удалить'} onClick={props.onRemoveToCart}></Item>
                  </div>
                )}
                <div className={cn('total')}>
                  <p>
                    Итого <span className={cn('total-price')}>{getCurrencyPrice(props.totalPriceCart)}</span>
                  </p>
                </div>
              </>
          }         
        </div>      
      </div>
    </div>
  )
}

export default Modal;