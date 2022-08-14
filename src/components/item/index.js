import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {NavLink} from "react-router-dom";
import numberFormat from "../../utils/number-format";
import './style.css';

function Item(props) {
    const cn = bem('Item');

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <div className={cn('title')} onClick={() => props.setIdProduct(props.item._id)}>
                <NavLink to={`/product/${props.item._id}`} >
                    {props.item.title}
                </NavLink>
            </div>
            <div className={cn('right')}>
                <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
                <button onClick={callbacks.onAdd}>{props.lang.button.add}</button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,
    setIdProduct: propTypes.func,
}

Item.defaultProps = {
    onAdd: () => {},
    setIdProduct: () => {},
}

export default React.memo(Item);
