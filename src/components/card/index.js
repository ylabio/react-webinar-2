import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Card(props) {
    const cn = bem('Card');

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>

            <div className={cn('description')}>
                {props.item.description}
            </div>
            <div className={cn('made')}>
                Страна производитель: <p> {props.item.maidIn.title} ({props.item.maidIn.code})</p>
            </div>
            <div className={cn('category')}>
                Категория: <p>{props.item.category.title}</p>
            </div>
            <div className={cn('edition')}>
                Год выпуска: <p>{props.item.edition}</p>
            </div>
            <div className={cn('price')}>
                Цена: {numberFormat(props.item.price)} ₽
            </div>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

Card.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,

}

Card.defaultProps = {
    onAdd: () => {},
}

export default React.memo(Card);