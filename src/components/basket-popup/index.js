import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import BasketItem from "../basket-item";
import {getSumPrice} from "../../utils";

function BasketPopup(props) {
    const cn = bem('Basket');

    return (
        <div className={cn('wrapper')}>
            <div className={cn()}>
                <div className={cn('header')}>
                    <h1>Корзина</h1>
                    <button onClick={props.onBasketPopupClose}>
                        Закрыть
                    </button>
                </div>
                <div className={cn('list')}>
                    {props.items.map(item => {
                        const order = props.items.indexOf(item) + 1;
                        return (
                            <div key={item.code} className={cn('item')}>
                                <BasketItem
                                    item={item}
                                    onDelete={props.onItemDelete}
                                    order={order}
                                />
                            </div>
                        )
                    }

                    )}
                </div>
                <p className={cn('is-empty')}>{props.items < 1 ? 'Корзина пуста' : ''}</p>
                <p className={cn('sum')}><span className={cn('sum-text')}>Итого</span> <span className={cn('sum-price')}> {getSumPrice(props.items) + ' ₽'} </span></p>
            </div>
        </div>

    )
}

BasketPopup.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onItemDelete: propTypes.func.isRequired,
    onBasketPopupClose: propTypes.func.isRequired,
}

export default React.memo(BasketPopup);
