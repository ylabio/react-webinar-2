import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
    const cn = bem('Item');

    // Счётчик выделений
    const [count, setCount] = useState(0);

    const callbacks = {
        onCartDelete: useCallback((e) => {
            e.stopPropagation();
            props.onCartDelete(props.item.code);
        }, [props.onCartDelete, props.item]),

        onCartAdd: useCallback(() => {
            props.onCartAdd(props.item);
        }, [props.onCartAdd, props.item])
    };

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('price')}>
                {props.item.price.toLocaleString('ru-RU')}<span>₽</span>
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onCartAdd}>
                    Добавить
                </button>
            </div>
        </div>
    );
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onCartAdd: propTypes.func.isRequired,
    onCartDelete: propTypes.func.isRequired
};

Item.defaultProps = {
    onCartAdd: () => {
    },
    onCartDelete: () => {
    }
};

export default React.memo(Item);
