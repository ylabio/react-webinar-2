import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import List from "../list"
import Layout from '../layout';
import { getMeta } from "../../utils"

function Modal(props) {
  const cn = bem('Modal');

  useEffect(() => {
    if (!props.cart.length && props.active) {
      props.onClose()
    }
  }, [props.cart.length, props.active])

  const [cartlength, count, price] = getMeta(props.cart)
  return (

    (props.active) &&
    <div className={cn()}>
      <div className={cn("container")}>
        <Layout head={
          <div className={cn('head')}>
            <h1 className={cn('container__title')}>Корзина</h1>

            <button className={cn('button')} onClick={props.onClose}><div className={cn('text')}>Закрыть</div></button></div>
        }>
          <div className={cn('content')}>
            <div className={cn('content__list')}>
              <List list={props.cart} actionName={'Удалить'} onClick={props.onDelete}>
              </List>
            </div>
            <div className={cn('common__container')}>
              <div className={cn('common__price')}>{price.toLocaleString()} ₽</div>
              <div className={cn('common')}>
                Итого
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(Modal);
