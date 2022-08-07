import React, {useState} from 'react';
import plural from 'plural-ru';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Cart from 'src/components/cart';
import ModalBasic from 'src/components/modal-basic';
import {numberFormat, sumProducts} from 'src/utils';
import './style.css';

function Controls(props) {
  const cn = bem('Controls');

  const [isActiveModal, setIsActiveModal] = useState(false)

  const onCloseModal = () => {
    setIsActiveModal(false)
  }

  const onOpenModal = () => {
    setIsActiveModal(true)
  }

  const quantityProduct = props.cart.length
  const totalSum = numberFormat(sumProducts(props.cart))

  return (
    <div className={cn()}>
      <p className={cn('description')}>В корзине: </p>
      <p className={cn('product')}>
        {quantityProduct ? ` ${quantityProduct} ${plural(quantityProduct, 'товар', 'товара', 'товаров')}` : 'пусто'}
        {quantityProduct ? ` / ${totalSum}` : null}
      </p>
      <button className={cn('button')} onClick={onOpenModal}>Перейти</button>
      <ModalBasic closeModal={onCloseModal} isActive={isActiveModal}>
        <Cart items={props.cart}
              total={totalSum}
              onDeleteToCartItem={props.onDeleteToCartItem}/>
      </ModalBasic>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteToCartItem: propTypes.func.isRequired,
}

export default React.memo(Controls);
