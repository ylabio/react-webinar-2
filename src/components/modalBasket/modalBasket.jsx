import React from 'react';
import {cn as bem} from '@bem-react/classname';
import modal from './modal.css'
import BasketItem from '../item/basketItem';
import {getPriceFormatter, getBasketTotalPrice} from '../../utils'

const ModalBasket = ({onCloseBasketClicked, state, onItemDelete}) => {
    const cn = bem('Item');

    let getBasketItems = () => {
        let basketItems = []
        for (var key in state.basket) {
            if (state.basket.hasOwnProperty(key)) {
                let item = state.items.filter(item => item.code == key)[0]
                item.count = state.basket[key]
                basketItems.push(item)
            }
        }
        return basketItems;
    }

    return (
        <div className ='modal active'>
            <div className ='modal_content active' onClick= {e => e.stopPropagation()}>
                <div className={'head'}>
                    <h1>Корзина</h1>
                    <button className='button' onClick={() => onCloseBasketClicked()}>Закрыть</button>
                </div>
                <div className='scrollable'>
                    {getBasketItems().map(basketItem =>
                        <div key={basketItem.code} className={'item'}>
                            <BasketItem item={basketItem} onItemDelete={onItemDelete}/>
                        </div>
                    )}
                    <div className='count'>
                        <div className='text'>Итого</div> 
                        {getPriceFormatter().format(getBasketTotalPrice(state))}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default  React.memo(ModalBasket);