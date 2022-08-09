import React from 'react';
import BasketItem from "../basket-item";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function basketList({basket, deleteItem}) {
    const cn = bem('Basket-list');
    return (
        <div className={cn()}>{basket.map(item =>
            <div key={item.code} className={cn('item')}>
                <BasketItem item={item} deleteItem={deleteItem}/>
            </div>
        )}
        </div>
    )
}

basketList.propTypes = {
    basket: propTypes.arrayOf(propTypes.object).isRequired,
    deleteItem: propTypes.func.isRequired,
}

export default React.memo(basketList)