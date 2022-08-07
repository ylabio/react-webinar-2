import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import List from '../list';
import Modal from '../modal';
import './style.css';

function Cart({cart, onItemDelete}) {
    const [openModal, setOpenModal] = useState(false);
    const cn = bem('Cart');

    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <span className={cn('title')}>В корзине:</span>

                {cart.items.length ?
                    <span className={cn('text')}>
                        {cart.items.length} {plural(cart.items.length, 'товар', 'товара', 'товаров')} / {cart.totalPrice.toLocaleString('ru-RU')} ₽</span> :
                    <span className={cn('text')}>Пусто</span>}
            </div>
            <button onClick={() => setOpenModal(true)}>Перейти</button>
            {openModal &&
                <Modal title="Корзина" onClose={() => setOpenModal(false)}>
                    {
                        cart.items.length ?
                        <>
                            <List items={cart.items} onItemDelete={onItemDelete} inCart={true}/>
                            <div className={cn('total')}>
                                <span>Итого</span>
                                <span>{cart.totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                        </> :
                        <h3 className={cn('empty')}>Добавьте в корзину нужные товары</h3>
                    }
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
    onItemDelete: () => {}
};

export default React.memo(Cart);