import React from 'react';
import './style.css';
import plural from "plural-ru";

function Controls(props) {
    return (
        <div className='Controls'>
            <span className='Controls-text'>В корзине:</span>
            <span className='Controls-total'>
                {(props.totalCount > 0) ? props.totalCount + ' ' +
                    plural(props.totalCount, 'товар', 'товара', 'товаров') + ' / ' +
                    props.totalPrice + ' ₽' : 'пусто'}
            </span>
            <button onClick={props.openCart}>Перейти</button>
        </div>
    )
}

export default React.memo(Controls);
