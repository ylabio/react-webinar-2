import React from "react";
import {cn as bem} from "@bem-react/classname";

import List from "../list";

import './style.css'
import Layout from "../layout";

function Cart({cartItemsList, closeCart, deleteItemFromCart}) {
	const cn = bem('Cart')
	const cartTotal = cartItemsList.reduce((prev, next) => prev + next.price * next.count, 0)
	
	return (
		<div className={cn()}>
			<div className={cn('content')}>
				<div className={cn('head')}>
					<h1 className={cn('title')}>Корзина</h1>
					<button className={cn('close-btn')} onClick={closeCart}>Закрыть</button>
				</div>
				{
					cartItemsList.length > 0 && (
						<>
							<List items={cartItemsList} action={{actionName: 'Удалить', callback: deleteItemFromCart}} />
							<b className={cn('total')}>{`Итого ${cartTotal} \u20BD`}</b>
						</>
					)
				}
			</div>
		</div>
	)
}

export default React.memo(Cart);

