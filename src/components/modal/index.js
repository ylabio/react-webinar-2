import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import List from '../list';

function Modal({ closeModal, items, onItemDeleteFromCart, totalPrice }) {
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            <div className={cn('content')}>
                <div className={cn('header')}>
                    <h2>Корзина</h2>
                    <button onClick={closeModal}>Закрыть</button>
                </div>
                <List items={items} onItemDeleteFromCart={onItemDeleteFromCart} />
                {items.length ? (
                    <div className={cn('total')}>
                        Итого:{' '}
                        {new Intl.NumberFormat('ru', {
                            style: 'currency',
                            currency: 'RUB',
                            minimumFractionDigits: 0,
                        }).format(totalPrice)}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

Modal.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    closeModal: propTypes.func.isRequired,
    onItemDeleteFromCart: propTypes.func,
    totalPrice: propTypes.number,
};

Modal.defaultProps = {
    items: [],
    closeModal: () => {},
    onItemDeleteFromCart: () => {},
    totalPrice: 0,
};

export default React.memo(Modal);