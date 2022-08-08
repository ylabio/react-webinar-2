import React from 'react'
import './style.css'
function BasketItem({ basketItem, onDeleteItems }) {
    return (
        <div className='BasketItem'>
            <div className='BasketItem_info'>

                <p className='Basket_info_code'>{basketItem.code}</p>
                <p>{basketItem.title}</p>
            </div>
            <div className='Basket_wrapper_info'>
                <div className='Basket_info_price_amount'>
                    <p>{basketItem.price} ₽</p>
                    <p>{basketItem.amountInBasket} шт</p>

                </div>
                <div className='Basket_bth_delete' onClick={() => onDeleteItems(basketItem.code, basketItem.amountInBasket, basketItem.price)}>
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default BasketItem