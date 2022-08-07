import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, onItemAdd, onItemDelete, inCart}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
        <div key={item.code} className={cn('item')}>
            <Item item={item} onCartAdd={onItemAdd} onCartDelete={onItemDelete} inCart={inCart}/>
        </div>
    )}
    </div>
);
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
    onItemAdd: propTypes.func,
    onItemDelete: propTypes.func,
    inCart: propTypes.bool.isRequired,
};

List.defaultProps = {
  items: [],
    onItemAdd: () => {
    },
    onItemDelete: () => {
    },
    inCart: false
};

export default React.memo(List);
