import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls({ onAdd, totalPrice, totalQuantity }) {
    const cn = bem('Controls');
    return (
        <div className={cn()}>
            <div className={cn('cart')}>
                В корзине:{' '}
                <b>
                    {totalQuantity
                        ? `${totalQuantity} ${plural(
                              totalQuantity,
                              'товар',
                              'товара',
                              'товаров'
                          )} / ${totalPrice} ₽`
                        : 'пусто'}
                </b>
            </div>
            <div className={cn('cart')}>
                <button onClick={onAdd}>Перейти</button>
            </div>
        </div>
    );
}

Controls.propTypes = {
    totalQuantity: propTypes.number,
    totalPrice: propTypes.number,
    onAdd: propTypes.func.isRequired, // Обязательное свойство - функция
};

Controls.defaultProps = {
    totalQuantity: 0,
    totalPrice: 0,
    onAdd: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);
