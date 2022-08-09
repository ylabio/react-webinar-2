import React, {useCallback} from "react";
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import {formatNumber} from '../../utils.js';



const CartItem = ({item, onDeleteItem}) => {
    const cn = bem("Cart-item");

    const callbacks = {
        onDeleteItem: useCallback(() => {
            onDeleteItem(item.code);
        }, [item, onDeleteItem])
    }

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {item.code}
            </div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {formatNumber(item.price) + " ₽"} 
            </div>
            <div className={cn('count')}>
                {item.count + " шт"} 
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onDeleteItem}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: propTypes.object.isRequired,
    onDeleteItem: propTypes.func.isRequired,
};
  
// CartItem.defaultProps = {
//     item: {},
//     onDeleteItem: () => {},
// };

export default React.memo(CartItem)