import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import "./style.css";

function CartItem({item, index, onRemove}) {
    const cn = bem('CartItem');

    return(
        <div className={cn()}>
            <div className={cn('block1')}>
                <span>{index}</span>
                <span>{item.title}</span>
            </div>
            <div className={cn('block2')}>
                <span className={cn('price')}>{item.price} &#8381;</span>
                <span className={cn('count')}>{item.count} шт</span>
                <button onClick={() => onRemove(item.code)}>Удалить</button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
    onRemove: propTypes.func.isRequired
}

export default React.memo(CartItem);