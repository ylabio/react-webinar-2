import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ItemDetails({onAdd, item}) {

    const callbacks = {
        onAdd: useCallback((e) => onAdd(item._id), [onAdd, item])
    };

    const cn = bem('Details');
    return (
        <div className={cn()}>
            <div className={cn('info')}>{item.description}</div>
            <div className={cn('info')}>
                Страна производитель: <span>{item.country} ({item.countryCode})</span>
            </div>
            <div className={cn('info')}>
                Категория: <span>{item.category}</span>
            </div>
            <div className={cn('info')}>
                Год выпуска: <span>{item.edition}</span>
            </div>
            <div className={cn('price')}>
                Цена: <span>{item.price.toString().replace('.', ',')} ₽</span>
            </div>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

ItemDetails.propTypes = {
    onAdd: propTypes.func.isRequired,
    item: propTypes.object.isRequired,
}

export default React.memo(ItemDetails);