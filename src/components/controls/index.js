import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {getPrice, getSumArrayProperties} from "../../utils";


function Controls({showModal, product}) {
    const cn = bem('Controls');

    let basketLabel
    if (!product.length) {
        basketLabel = 'Пусто'
    } else {
        const basketPriceSum = getSumArrayProperties(product, 'price')
        const basketProductCount = getSumArrayProperties(product, 'quantity')
        const basketPrice = getPrice(basketPriceSum)
        basketLabel = `${plural(basketProductCount, '%d товар', '%d товара', '%d товаров')} / ${basketPrice}`
    }
    return (
        <div className={cn()}>
            <div className={cn('price')}>
                <span>В корзине: <b>{basketLabel}</b></span>
            </div>
            <div className={cn('actions')}>
                <button onClick={showModal}>Перейти</button>
            </div>
        </div>
    )
}

Controls.propTypes = {
    showModal: propTypes.func.isRequired, // Обяхательное свойство - функция
    product: propTypes.array.isRequired
}

Controls.defaultProps = {
    showModal: () => {
    }, // Значение по умолчанию - функция-заглушка
    product: []
}

export default React.memo(Controls);
