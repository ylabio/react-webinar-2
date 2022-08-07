import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";

function Controls({totalCount, totalPrice, setModalActive}) {
    const cn = bem('Controls');
    return (
        <div className={cn()}>
            <div className={cn('basket')}>
                В корзине:<span className={cn('basket-price')}>
                {totalCount ? `${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')} / 
                ${totalPrice.toLocaleString()} ₽` : `пусто`}
            </span>
            </div>
            <button onClick={() => setModalActive(true)}>Перейти</button>
        </div>
    )
}

Controls.propTypes = {
    setModalActive: propTypes.func.isRequired, // Обязательное свойство - функция
    totalPrice: propTypes.number,
    totalCount: propTypes.number,
}

Controls.defaultProps = {
    totalPrice: null,
    totalCount: null
}

export default React.memo(Controls);
