import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";


import "./style.css";

function BasketSum({price}) {
    const cn = bem('BasketSum')
    return (
        <div className={cn()}>
            <span className={cn('title')}>Итого</span>
            <span>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"}</span>
        </div>
    )
}

BasketSum.propTypes = {
    price: propTypes.number
}

export default React.memo(BasketSum);