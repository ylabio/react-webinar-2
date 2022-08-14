import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import BaseButton from "../base-button";
import {divideOnDigits} from "../../utils";

function Controls({onClick, buttonName,totalPrice,totalItemCount}) {
    const cn = bem('Controls');


    return (
        <div className='Controls'>
            <span className={cn('cart')}>В корзине:</span>
            <span className='Controls__cartItem'>
            <h3>
                {totalItemCount > 0 ?
                    `${totalItemCount} ${plural(totalItemCount,'товар', 'товара', 'товаров')} / 
                    ${divideOnDigits(totalPrice)}`:'пусто'}
            </h3>
        </span>
            <BaseButton onClick={onClick}>{buttonName}</BaseButton>
        </div>
    )
}

Controls.propTypes = {
    cartItems: propTypes.arrayOf(propTypes.object).isRequired,
    setActivePopupCart: propTypes.func.isRequired,
}

Controls.defaultProps = {
    cartItems:[],
    setActivePopupCart: false
}

export default React.memo(Controls);