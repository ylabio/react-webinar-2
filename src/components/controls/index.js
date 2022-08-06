import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru'
import CartComponent from "../cart/cartComponent";

function Controls({goodsInCart, setGoodsInCart}) {

    const [cartStatus, setCartStatus] = useState(false)

    const onAddToCart = () => {
        setCartStatus(true)
    }

    const price = goodsInCart.reduce((prev, cur) => prev + cur.count * cur.price, 0) // находим сумму товаров

    return (
        <div className='Controls'>
            <span
                className='Description'>В корзине: <strong>{plural(goodsInCart.length, '%d товар', '%d товара', '%d товаров')} / {price} ₽</strong>
            </span>
            <button onClick={onAddToCart}>Перейти</button>
            <CartComponent cartStatus={cartStatus} setCartStatus={setCartStatus} goodsInCart={goodsInCart} price={price} setGoodsInCart={setGoodsInCart}/>
        </div>
    )
}


Controls.defaultProps = {
    onAddToCart: () => {
    } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
