import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
      <div className={cn()}>
        {props.items.map((item, index) => (
            <div key={item.code} className={cn('item')}>
              <Item
                  num={index + 1}
                  item={item}
                  onAddToCart={props.onItemAddToCart}
                  onDeleteFromCart={props.onItemDeleteFromCart}
              />
            </div>
        ))}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func
}

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {}
}

export default React.memo(List);
