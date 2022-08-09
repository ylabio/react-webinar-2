import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Button from '../button';
import List from '../list';
import CartItem from '../cart-item';
import ModalLayout from '../modal-layout'

function Modal({active, callModal, cart, callback}) {
	const cn = bem('Modal');

	const cartListItems = [...cart.cartItems]
	.sort((a,b) => a.code > b.code ? 1 : -1)
	.map(item =>{
    return (
		<>
      <CartItem key={item.code} item={item}
      buttonAction={callback}/>
    </>)
		});

  return (
	<div className={cn({'active': active})} onClick={()=>callModal(false)}>
	  <div className={cn('content')} onClick={(e)=> e.stopPropagation()}>
		<ModalLayout head={
		  <>
			<h1>Корзина</h1>
			<Button callback={()=>callModal(false)}>Закрыть</Button>
		  </>} fullHeight={false}>
		  <List items={cart.cartItems} callback={callback}>{cartListItems}</List>
		  <div className={cn('footer')}>
			<span>Итого</span>
			<span>{(cart.totalCost).toLocaleString('ru-RU',{style:'currency', currency:'RUB',maximumFractionDigits: 0})}</span>
		  </div>
		</ModalLayout>
	  </div>
	</div>
  )
}

Modal.propTypes = {
	active: propTypes.bool.isRequired,
	cart: propTypes.object.isRequired,
	callback: propTypes.func.isRequired,
	callModal: propTypes.func.isRequired // Обяхательное свойство - функция
}
  
Modal.defaultProps = {
	callback: () => {},
	callModal: () => {} // Значение по умолчанию - функция-заглушка
}
  
export default React.memo(Modal);