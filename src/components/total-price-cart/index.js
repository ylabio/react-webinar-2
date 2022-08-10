import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css'

const TotalPriceCart = ({getTotalPrice}) => {
    const cn = bem('total-price')
    return (
        <div className={cn('')}>
            <div className={cn('text')}>Итого </div>
            <div className={cn('sum')}>{getTotalPrice}</div>
        </div>
    )
}

export default React.memo(TotalPriceCart)

TotalPriceCart.propTypes = {
    getTotalPrice: propTypes.number.isRequired,
}

TotalPriceCart.defaultProps = {
    getTotalPrice: 0,
}


