import React from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import ModalItem from '../modalItem';
import { formatCurrency } from '../../utils'

function Modal({closeModal, basketItems, deleteItemFromBasket, totalPrice}) {

    const cn = bem('Modal')

    return (
        <div className = {cn('wrapper')}>
            <div className = {cn('container')}>
                <div className = {cn('header')}>
                    <h1>Корзина</h1>
                    <button onClick = {closeModal}>Закрыть</button>
                </div>
                <div className = {cn('items')}>
                    {
                        basketItems.length > 0 
                    ?
                        basketItems.map((item, index) => {
                            return (
                                <div className = {cn('item')} key = {index + 228}>
                                    <ModalItem
                                        item = {item}
                                        index = {index}
                                        deleteItemFromBasket = {deleteItemFromBasket}
                                    />
                                </div>
                            )
                        })

                    :
                        <>
                            <h2 className = {cn('basketEmpty')}>Корзина пуста :(</h2>
                            <h2 className = {cn('basketEmpty')}>Наполни её чем-нибудь...</h2>
                        </>
                    }
                </div>
                {
                    basketItems.length > 0
                ?
                    <div className = {cn('footer')}>
                        <h2 className = {cn('footer-text')}>Итого <span className = {cn('footer-price')}>{formatCurrency(totalPrice)}</span></h2>
                    </div>
                :
                    null
                }
            </div>
        </div>
    )
}

export default React.memo(Modal)
