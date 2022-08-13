import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import {Link} from "react-router-dom";

function Item(props) {
    const cn = bem('Item');

    const callbacks = {
        onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item]),
        getId: useCallback(() => props.getId(props.item._id), [props.getId])
    };
    return (
        <div className={cn()}>
            {/*<div className={cn('id')}>*/}
            {/*  {props.item._id}*/}
            {/*</div>*/}
            <div className={cn('title')}>
                <Link to={props.item._id} onClick={() => callbacks.getId()}>
                    {props.item.title}
                </Link>
            </div>
            <div className={cn('right')}>
                <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
                <button onClick={callbacks.onAdd}>Добавить</button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

Item.defaultProps = {
    onAdd: () => {
    },
}

export default React.memo(Item);
