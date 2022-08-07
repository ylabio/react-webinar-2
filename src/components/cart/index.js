import React, {useCallback} from 'react'
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {CartItem} from "../cartItem/cartItem";
import Layout from "../layout";

export const Cart = React.memo(({setActive, cartsItems, onDelete, sum, uniqueCartItems}) => {
    const cn = bem('cart');

    const cardItemCount = useCallback((item) => {
        let count = 0
        cartsItems.map(el => el.code === item.code && count++)
        return count
    },[cartsItems])

    const head = () => {
        return (<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0 20px'}}>
                <h1>Корзина</h1>
                <button onClick={() => setActive(false)}>Закрыть</button>
            </div>

        )
    }
    return (
        <div className={cn()}>
            <div className={cn('content')}>
                <Layout head={head()} style={'cartLayout'}>
                    {uniqueCartItems(cartsItems).map(item => <CartItem cartItem={item} onDelete={onDelete} count={cardItemCount(item)} />)}
                    <h3 style={{marginLeft: '10px'}}>Итого: {sum} ₽</h3>
                </Layout>
            </div>

        </div>
    )
})

Cart.propTypes = {
    sum: propTypes.number,
    setActive: propTypes.func.isRequired,
    cartsItems: propTypes.array,
    onDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
    onDelete: () => {
    },
    cartsItems: [],
    sum: 0
}

