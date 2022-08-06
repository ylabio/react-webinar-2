import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Basket({onVisibility, price, count}) {
    const cn = bem('Basket');
    const basketSumCount = `${count} ${plural(count, "товар", "товара", "товаров")}`;
    const basketSumPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
    return (
        <div className={cn()}>
            <div className={cn('title')}>
                В корзине:
                <span className={cn('info')}>{price ? `${basketSumCount + " / " + basketSumPrice}` : "пусто"}</span>
            </div>

            <button className={cn('button')} onClick={() => onVisibility()}>перейти</button>
        </div>
    )
}

Basket.propTypes = {
    onVisibility: propTypes.func.isRequired,
    price: propTypes.number,
    count: propTypes.number
}

export default React.memo(Basket);