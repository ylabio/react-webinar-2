import React from 'react'
import BasketItem from './../baslet-item/index';
import propTypes from 'prop-types'
import './style.css'
function BasketProduct({ basket, priceProduct, onDeleteItems }) {
    return (
        <div className='BasketProduct'>

            {
                basket.map((basketItem, index) => (
                    <BasketItem
                        key={index + (new Date()).getMilliseconds()}
                        onDeleteItems={onDeleteItems}
                        basketItem={basketItem} />
                )

                )
            }
            {
                basket.length > 0 ?
                    <div className='Basket_product_wrapper_price'>

                        <p>Итог</p>
                        <p className='Basket_product_price'>{priceProduct.toLocaleString()} ₽</p>

                    </div> :
                    <div className='Baket_product_not'>
                        <p>Вы ничего не выбрали</p>
                    </div>
            }

        </div>
    )
}
BasketProduct.propTypes = {
    basket: propTypes.array.isRequired,
    priceProduct: propTypes.number.isRequired,
    onDeleteItems: propTypes.func.isRequired
}


export default BasketProduct