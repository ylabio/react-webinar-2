import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ListCart from '../list-cart';

function Modal(props) {
  const cn = bem('Modal');
  return (
    <div className={cn('over')}>
        <div className={cn()}>
            <div className={cn('head')}>
                <h1>Корзина</h1>
                <button onClick={props.onCloseCart}>Закрыть</button>
            </div>
            <ListCart 
                itemsCart={props.itemsCart} 
                sumPrices={props.sumPrices} 
                onItemCartDelete={props.onItemCartDelete} 
            />
        </div>
    </div>
  )
}

Modal.propTypes = {
    itemsCart: propTypes.arrayOf(propTypes.object).isRequired,
    sumPrices: propTypes.number.isRequired,
    onItemCartDelete: propTypes.func.isRequired,
    onCloseCart: propTypes.func.isRequired
}

Modal.defaultProps = {
    itemsCart: [],
    sumPrices: 0,
    onItemCartDelete: () => {},
    onCloseCart: () => {}
}

export default React.memo(Modal);