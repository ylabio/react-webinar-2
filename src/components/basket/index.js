import React from 'react'
import BasketProduct from '../basket-product'
import propTypes from 'prop-types';
import './style.css'
function Basket({ active, setActive, basket, priceProduct, onDeleteItems }) {
    return (
        <div className={active ? 'Basket_modal active' : 'Basket_modal'}>
            <div className='Basket_modal_content'>
                <div className='Basket_modal_menu'>
                    <p>Корзина</p>
                    <div className='Basket_modal_bth'>
                        <button onClickCapture={() => setActive(false)}>Закрыть</button>
                    </div>
                </div>
                <BasketProduct
                    priceProduct={priceProduct}
                    onDeleteItems={onDeleteItems}
                    basket={basket}
                />
            </div>
        </div>
    )
}
Basket.propTypes = {

    active: propTypes.bool.isRequired,
    setActive: propTypes.func.isRequired,
    basket: propTypes.array.isRequired,
    priceProduct: propTypes.number.isRequired,
    onDeleteItems: propTypes.func.isRequired,
}


export default Basket