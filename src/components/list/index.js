import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

/** Components */
import Product from "./product.js";

/** Styles */
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Product product={item} onAdd={props.onAddToBasket} />
      </div>
    )}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddToBasket: propTypes.func,
};

List.defaultProps = {
  onAddToBasket: () => {},
};

export default React.memo(List);
