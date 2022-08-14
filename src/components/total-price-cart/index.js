import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css'
import {divideOnDigits} from "../../utils";

const TotalPriceCart = ({totalPrice}) => {

    const cn = bem('total-price')
    return (
        <div className={cn('')}>
            <div className={cn('text')}>Итого </div>
            <div className={cn('sum')}>{divideOnDigits(totalPrice)}</div>
        </div>
    )
}

export default React.memo(TotalPriceCart)

TotalPriceCart.propTypes = {
    totalPrice: propTypes.number.isRequired,
}

TotalPriceCart.defaultProps = {
    totalPrice: 0,
}


