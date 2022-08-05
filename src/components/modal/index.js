import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../layout/index'
import Item from '../item';

function Modal({active, callModal, cartItems}) {
	const cn = bem('Modal');

  return (
	<div className={cn({'active': active})} onClick={()=>callModal(false)}>
		<div className={cn('content')} onClick={(e)=> e.stopPropagation()}>
			<Layout head={<h1>Корзина</h1>} fullHeight={false}>
				<div>{cartItems.map(item=><div key={item.code} className={cn('item')}><Item item={item}/></div>)}</div>
				<div className={cn('footer')}>kjsdfkljsdf</div>
			</Layout>
		</div>
	</div>
  )
}

Modal.propTypes = {
	active: propTypes.bool.isRequired,
	cartItems: propTypes.object.isRequired,
	callModal: propTypes.func.isRequired // Обяхательное свойство - функция
  }
  
Modal.defaultProps = {
	callModal: () => {} // Значение по умолчанию - функция-заглушка
  }
  
export default React.memo(Modal);