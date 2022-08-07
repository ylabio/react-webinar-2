import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item 
          item={item} 
          onAddProductToCart={props.onAddProductToCart}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddProductToCart: propTypes.func.isRequired
}

List.defaultProps = {
  items: [],
  onAddProductToCart: () => {}
}

export default React.memo(List);
