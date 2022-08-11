import './basket-list.css'
import { cn as bem } from "@bem-react/classname";
import React from 'react';
import propTypes from 'prop-types';

const BasketList = (props) => {
    const cn = bem('Basket-list');

    return (
        <div className={cn('item')}>
            <div className={cn('number')}>
                {props.code}
            </div>
            <div className={cn('title')}>
                {props.title}
            </div>
            <div className={cn('actions')}>
                <span className={cn('prise')}>{props.priceFormation(props.price)} &#x20bd;</span>
                <span className={cn('amount')}> {props.amount} шт</span>
                <button onClick={() => props.onDeleteItems(props.code, props.amount, props.price)}>Удалить</button>
            </div>
        </div>
    )
}

BasketList.propTypes = {
    priceFormation: propTypes.func.isRequired,
    onDeleteItems: propTypes.func.isRequired

}

BasketList.defaultProps = {
    priceFormation: () => { },
    onDeleteItems: () => { }

}

export default BasketList;