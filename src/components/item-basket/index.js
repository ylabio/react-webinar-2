import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";
import useStore from "../../utils/use-store";
import {useNavigate} from "react-router";

function ItemBasket(props) {
    const cn = bem('ItemBasket');

    const callbacks = {
        onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
        onRedirect: useCallback((e) => {
            props.onRedirect(props.item._id)
        }, [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <p onClick={callbacks.onRedirect} className={cn('title')}>
                {props.item.title}
            </p>
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
    onRedirect: propTypes.func
}

ItemBasket.defaultProps = {}

export default React.memo(ItemBasket);
