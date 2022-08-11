import React from 'react';
import './style.css';
import plural from "plural-ru";
import propTypes from "prop-types";

function Controls(props) {
    return (
        <div className='Controls'>
            <span className='Controls-text'>В корзине:</span>
            <span className='Controls-total'>
                {(props.totalCount > 0) ? props.totalCount + ' ' +
                    plural(props.totalCount, 'товар', 'товара', 'товаров') + ' / ' +
                    props.totalPrice + '  ' : 'пусто'}
            </span>
            <button onClick={props.openCart}>Перейти</button>
        </div>
    )
}

Controls.propTypes = {
    totalCount: propTypes.number.isRequired,
    openCart: propTypes.func.isRequired,
}

Controls.defaultProps = {
    totalCount: 0,
}

export default React.memo(Controls);
