import { cn as bem } from '@bem-react/classname'
import React from 'react'
import propTypes from 'prop-types';
import ItemCart from '../itemCart'
import Layout from '../layout'
import List from '../list'
import './style.css'

function Cart({
  handleClose,
  cart,
  handleBtn,
  onClick
}) {
  const cn = bem('Cart')
  return (
    <div className={cn()}>
      <Layout head={
      <>
        <h1>Корзина</h1>
        <button onClick={handleClose}>Закрыть</button>
      </>
      } onClick={onClick}> {/* Чтобы при клике на саму корзину модальник не скидывало */}
        {
        cart.items.length 
        ? 
        <> {/* Фрагментом это делать неприлично, но здесь норм */}
          <List handleBtn={handleBtn}
                items={cart.items}
                ItemType={ItemCart}
          />
          <div className={cn('sum')}>
            <div>Итого: </div>
            <div>{cart.cost.toLocaleString('ru')} ₽</div>
          </div>
        </>
        : 
        <div className={cn('empty')}>
          <span className={cn('empty-bold')}>Корзина пуста!</span>
          <span className={cn('empty-text')}>Приходите, когда выберите товары</span>
        </div>
        }
      </Layout>
    </div>
  )
}

Cart.propTypes = {
  handleBtn: propTypes.func.isRequired,
  handleClose: propTypes.func,
  cart: propTypes.object.isRequired,
  onClick: propTypes.func
}

Cart.defaultProps = {
  handleClose: () => {},
  onClick: () => {}
}

export default React.memo(Cart)