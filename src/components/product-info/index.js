import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ProductInfo(props) {
    const cn = bem('ProductInfo');

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item?._id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <div className={cn('text')}>
                {props.item?.description}
            </div>
            <div className={cn('text')}>
                Код товара: <b>{props.item?.name}</b>
            </div>
            <div className={cn('text')}>
                Категория: <b>{props.item?.category._id}</b>
            </div>
            <div className={cn('text')}>
                Год выпуска: <b>{props.item?.edition}</b>
            </div>
            <div className={cn('price')}>
                <b>Цена: {numberFormat(props.item?.price)} ₽</b>
            </div>
            <div className={cn('button')}>
                <button onClick={callbacks.onAdd}>Добавить</button>
            </div>
        </div>
    )
}

ProductInfo.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

ProductInfo.defaultProps = {
    onAdd: () => {
    },
}

export default React.memo(ProductInfo);
