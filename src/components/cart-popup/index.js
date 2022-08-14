import {cn as bem} from "@bem-react/classname";
import './style.css'
import React from "react";
import propTypes from "prop-types";

const CartPopup = ({children}) => {
    const cn = bem('Modal')

    return (
        <div className={cn('')}>
                <div className={cn('content')}>
                    {children}
                </div>
        </div>
    )
}

export default React.memo(CartPopup)

CartPopup.propTypes = {
    setActivePopupCart: propTypes.func.isRequired,
    children: propTypes.node,
    cartItems:propTypes.arrayOf(propTypes.object).isRequired,
}

CartPopup.defaultProps = {
    setActivePopupCart: false,
    cartItems:[],
}

