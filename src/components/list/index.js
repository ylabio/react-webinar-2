import React, { useCallback, useContext } from 'react';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import propTypes from 'prop-types';

function List({ addItemToCart, items }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item 
            item={item} 
            addItemToCart={addItemToCart}
          />
        </div>
      )}
    </div>
  );
}

List.propTypes = { 
  items: propTypes.array.isRequired,
  addItemToCart: propTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
  addItemToCart: () => {},
};

export default React.memo(List);
