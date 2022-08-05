import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketItem(props) {
    const cn = bem('Item-basket');
    const price = Intl.NumberFormat("ru").format(props.item.price)

    // const callbacks = {
    //
    //     onDelete: useCallback((e) => {
    //         e.stopPropagation();
    //         props.onDelete(props.item.code)
    //     }, [props.onDelete,  props.item])
    // };

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('actions')}>
                <div className={cn('wrapper')}>
                    <p className={cn('price')}>{price +' ₽'}</p>
                    <p className={cn('count')}> {props.item.count}  шт</p>
                    <button>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

BasketItem.propTypes = {
    item: propTypes.object.isRequired,
    onSelect: propTypes.func.isRequired,
    onDeleted: propTypes.func.isRequired
}

BasketItem.defaultProps = {
    onSelect: () => {},
    onDeleted: () => {}
}

export default React.memo(BasketItem);
