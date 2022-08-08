import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";
import './style.css';

import { formatNumber } from '../../utils';

function BasketPreview({onVisibility, price, count}) {
    const cn = bem('Basket');
    const basketSumCount = `${count} ${plural(count, "товар", "товара", "товаров")}`;
    const basketSumPrice = formatNumber(price) + " ₽";
    return (
        <div className={cn()}>
            <div className={cn('title')}>
                В корзине:
                <span className={cn('info')}>{count ? `${basketSumCount + " / " + basketSumPrice}` : "пусто"}</span>
            </div>

            <button className={cn('button')} onClick={() => onVisibility()}>перейти</button>
        </div>
    )
}

BasketPreview.propTypes = {
    onVisibility: propTypes.func.isRequired,
    price: propTypes.number,
    count: propTypes.number
}

export default React.memo(BasketPreview);