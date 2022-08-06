import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Modal from '../modal';

function Controls({items, onItemDeleteFromCart}) {
    const cn = bem('Controls');

    const [totalPrice, setTotalPrice] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleModalClick = () => {
        setIsModalOpen((prev) => !prev);
    };

    React.useEffect(() => {
        setTotalPrice(
            items.reduce((acc, item) => {
                return acc + item.price * item.amount;
            }, 0)
        );
    }, [items]);
    return (
            <div className={cn()}>
                <p className={cn('cart')}>В корзине:</p>
                {items.length ? (
                    <p className={cn('info')}>
                        {items.length} {plural(items.length, 'товар', 'товара', 'товаров')} /{' '}
                        {new Intl.NumberFormat('ru', {
                            style: 'currency',
                            currency: 'RUB',
                            minimumFractionDigits: 0,
                        }).format(totalPrice)}
                    </p>
                ) : (
                    <p className={cn('info')}>пусто</p>
                )}

                <button onClick={handleModalClick}>Перейти</button>
                {isModalOpen && (
                    <Modal
                        closeModal={handleModalClick}
                        items={items}
                        onItemDeleteFromCart={onItemDeleteFromCart}
                        totalPrice={totalPrice}
                    />
                )}
            </div>
    )
}

Controls.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onItemDeleteFromCart: propTypes.func,
}

Controls.defaultProps = {
    items: [],
    onItemDeleteFromCart: () => {}
}

export default React.memo(Controls);
