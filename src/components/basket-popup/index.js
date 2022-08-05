import React from 'react';
// import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import BasketItem from "../basket-item";
import {getSumPrice} from "../../utils";

function BasketPopup(props) {
    const cn = bem('Basket');

    return (
        <>
            <div className={cn('wrapper')}>
            </div>
            <div className={cn()}>
                <div className={cn('header')}>
                    <h1>Корзина</h1>
                    <button>
                        Закрыть
                    </button>
                </div>
                <div className={cn('list')}>
                    {props.items.map(item =>
                        <div key={item.code} className={cn('item')}>
                            <BasketItem item={item} onDelete={props.onItemDelete}/>
                        </div>
                    )}
                </div>
                <p className={cn('sum')}><span className={cn('sum-text')}>Итого</span> <span className={cn('sum-price')}> {getSumPrice(props.items) + ' ₽'} </span></p>
            </div>
        </>
    )
}

export default React.memo(BasketPopup);