import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, onAddBasketItem, children}) {
    const Item = children
    const cn = bem('List');
    return (
        <div className={cn()}>{items.map(item =>
            <div key={item.code} className={cn('item')}>
                <Item item={item} onAddBasketItem={onAddBasketItem}/>
            </div>
        )}
        </div>
    )
}

List.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onAddBasketItem: propTypes.func.isRequired,
    children: propTypes.object.isRequired
}

export default React.memo(List);