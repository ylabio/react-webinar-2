import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketItem(props) {
    const cn = bem('Item-basket');
    const price = Intl.NumberFormat("ru").format(props.item.price);

    const onDeleteHandler = useCallback(() => {
        props.onDelete(props.item.code)
    }, [props.onDelete]);

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.order}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('actions')}>
                <div className={cn('wrapper')}>
                    <p className={cn('price')}>{price +' ₽'}</p>
                    <p className={cn('count')}> {props.item.quantity + ' шт'}</p>
                    <button onClick={onDeleteHandler}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

BasketItem.propTypes = {
    item: propTypes.object.isRequired,
    onDelete: propTypes.func.isRequired
}

BasketItem.defaultProps = {
    onDelete: () => {}
}

export default React.memo(BasketItem);
