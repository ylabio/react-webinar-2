import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../layout/index'
import Button from '../button';
import List from '../list';

function Modal({active, callModal, cartItems, callback}) {
	const cn = bem('Modal');

	const totalPrice = cartItems.reduce((prev, curr)=> {
		return prev + (curr.price * curr.qty)}, 0)

  return (
	<div className={cn({'active': active})} onClick={()=>callModal(false)}>
		<div className={cn('content')} onClick={(e)=> e.stopPropagation()}>
			<Layout head={
				<>
					<h1>Корзина</h1>
					<Button callback={()=>callModal(false)}>Закрыть</Button>
				</>} 
					fullHeight={false}>
				<List items={cartItems} type={'cart'} callback={callback}/>
				<div className={cn('footer')}>
					<span>Итого</span>
					<span>{`${(totalPrice).toLocaleString()}  \u20BD`}</span>
				</div>
			</Layout>
		</div>
	</div>
  )
}

Modal.propTypes = {
	active: propTypes.bool.isRequired,
	cartItems: propTypes.arrayOf(propTypes.object).isRequired,
	callback: propTypes.func.isRequired,
	callModal: propTypes.func.isRequired // Обяхательное свойство - функция
}
  
Modal.defaultProps = {
	callback: () => {},
	callModal: () => {} // Значение по умолчанию - функция-заглушка
}
  
export default React.memo(Modal);
