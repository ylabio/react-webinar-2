import React from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import List from "../list";
import {getPrice, getSumArrayProperties} from "../../utils";

function Basket(props) {
    const cn = bem('Basket');

    const basketPriceSum = getSumArrayProperties(props.basket, 'price')
    const basketPrice = getPrice(basketPriceSum)

    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <h2>Корзина</h2>
                <button onClick={props.onClose}>закрыть</button>
            </div>
            {props.basket.length
                ? <>
                    <div className={cn('content')}>
                        <List items={props.basket} callBackOnClick={props.onItemDelete} label={'Удалить'}/>
                    </div>
                    <div className={cn('footer')}>
                        <span>Итого</span>
                        <span>{basketPrice}</span>
                    </div>
                </>
                : <div>
                    <h2>Пусто</h2>
                </div>
            }
        </div>
    )
}

Basket.propTypes = {
    basket: propTypes.array.isRequired,
    onClose: propTypes.func.isRequired,
    onItemDelete: propTypes.func.isRequired
}

Basket.defaultProps = {
    basket: [],
    onItemDelete: () => {
    },
    onClose: () => {
    },
}

export default React.memo(Basket)