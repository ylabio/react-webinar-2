import Controls from "../controls";
import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {product} from "../../utils";
import PropTypes from "prop-types";


export const Header = ({openModal, price, count}) => {
    const cn = bem('Header');
    return(
        <header className={cn()}>
            <p className={cn('cart')}>
                В корзине:
            </p>

            {count > 0 ?
                <b>
                    {count} {product(count)} / {price.toLocaleString()} ₽

                </b> : <b>
                    пусто
                </b>}
            <Controls title='Перейти' onAdd={() => openModal()}/>
        </header>
    )
}

Header.propTypes = {
    openModal: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
}