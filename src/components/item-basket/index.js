import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {NavLink} from "react-router-dom";

function ItemBasket(props) {
    const cn = bem('ItemBasket');

    const callbacks = {
        onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item])
    };

    const clickTitleItem = () => {
        props.setIdProduct(props.item._id);
        props.onClose();
    }

    return (
        <div className={cn()}>
            <div className={cn('title')} onClick={clickTitleItem}>
                <NavLink to={`/product/${props.item._id}`} >
                    {props.item.title}
                </NavLink>
            </div>
            <div className={cn('right')}>
                <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
                <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
                <div className={cn('cell')}>
                    <button onClick={callbacks.onRemove}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

ItemBasket.propTypes = {
    item: propTypes.object.isRequired,
    onRemove: propTypes.func,
    setIdProduct: propTypes.func,
    onClose: propTypes.func,
}

ItemBasket.defaultProps = {
    onRemove: () => {},
    setIdProduct: () => {},
    onClose: () => {},
}

export default React.memo(ItemBasket);
