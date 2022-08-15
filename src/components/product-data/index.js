import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ProductData(props) {
    const cn = bem('Product-data');

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <p>{props.item.description}</p>
            <p>Страна производитель: <span className={cn('value')}>{ props.itemCountry.title } ({props.itemCountry.code})</span></p>
            <p>Категория: <span className={cn('value')}>{props.itemCategory.title}</span></p>
            <p>Год выпуска: <span className={cn('value')}>{props.item.edition}</span></p>
            <p className={cn('price')}>Цена: {props.item.price} ₽</p>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}


ProductData.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,
    itemCategory: propTypes.object.isRequired,
}

ProductData.defaultProps = {
    onAdd: () => {},
}


export default React.memo(ProductData);
