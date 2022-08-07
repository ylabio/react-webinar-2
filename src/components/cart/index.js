import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

import List from "list";
import Modal from "modal";

import './style.css';

function Cart({cart, onItemDelete}) {
    const cn = bem('Cart');

    const [open, setOpen] = useState(false);
    const cartItems = <>{cart.items.length} {plural(cart.items.length, 'товар', 'товара', 'товаров')}</>;
    const cartPrice = <>{cart.price.toLocaleString('ru-RU')}<span> ₽</span></>;
    const modalContent = cart.items.length ?
        <>
            <List items={cart.items} onItemDelete={onItemDelete} inCart={true}/>
            <div className={cn('total')}>
                <span>Итого</span>
                <span>{cartPrice}</span>
            </div>
        </> :
        <h3 className={cn('empty')}>Корзина пуста 😕</h3>;

    return (
        <div className={cn('counter')}>
            <div className={cn('counter-info')}>
                <span className={cn('counter-title')}>В корзине:</span>

                {cart.items.length ?
                    <span className={cn('counter-text')}>{cartItems} / {cartPrice}</span> :
                    <span className={cn('counter-text')}>Пусто</span>}
            </div>
            <button onClick={() => setOpen(true)}>Перейти</button>

            {open &&
                <Modal title="Корзина" onClose={() => setOpen(false)}>
                    {modalContent}
                </Modal>
            }
        </div>
    );
}


Cart.propTypes = {
    cart: propTypes.object.isRequired,
    onItemDelete: propTypes.func,
};

Cart.defaultProps = {
    cart: {},
    onItemDelete: () => {
    }
};

export default React.memo(Cart);
