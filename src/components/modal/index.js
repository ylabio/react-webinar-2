import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../layout';
import List from "../list";

function Modal(props){
  if(!props.show){
    return null;
  }

  const cn = bem('Modal');

  return (
    <div className={cn()} onClick={props.onCartClose}>
      <Layout head={
        <>
          <h1>Корзина</h1>
          <button onClick={props.onCartClose}>Закрыть</button>
        </>
      }>
        {props.cart.length
        ? <div className={cn('fiiled')}>
        <List items={props.cart}
            btnHandle={props.onDeleteItemFromCart}
            btnText='Удалить'
        />
        <div className={cn('summary')}>
          <div className={cn('sum')}>
            <div>Итого</div>
            <div className={cn('sum-number')}>{props.getCartState().priceSum} ₽</div>
          </div>
        </div>
          </div> 
        : <div className={cn('empty')}>
            <span className={cn('empty-bold')}>В корзине пока ничего нет!</span>
            <span className={cn('empty-text')}>Добавьте понравившиеся товары и увидите их здесь.</span>
          </div>}
      </Layout>
    </div>
  )
}

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onCartClose: propTypes.func,
  onDeleteFromCart: propTypes.func,
  getCartState: propTypes.func
}

Modal.defaultProps = {
  cart: [],
  onCartClose: () => {},
  onDeleteFromCart: () => {},
  getCartState: () => {}
}

export default React.memo(Modal);
