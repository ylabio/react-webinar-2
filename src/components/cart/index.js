import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function Cart({ cart, calcCost, onDelete }) {
    const cn = bem('Cart');

    return (
        cart.length ?
            <div className={cn()}>{cart.map(item =>
                <div key={item.code} className={cn('item')}>
                    <Item item={item} butText={"Удалить"} butAction={onDelete} />
                </div>
            )}
                <div className={cn('total')}>
                    <span>Итого</span>
                    <span>{calcCost()} ₽</span>
                </div>
            </div>
            :
            <div className={cn('empty')}>
                Здесь пока ничего нет
            </div>
    )
}

Cart.propTypes = {
    calcCost: propTypes.func,
    cart: propTypes.array.isRequired,
    onDelete: propTypes.func,
}

Cart.defaultProps = {
    calcCost: () => { },
    onDelete: () => { },
}

export default React.memo(Cart);
