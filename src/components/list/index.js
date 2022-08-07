import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import { AppContext } from '../../context/app-context';

function List() {
  const {store} = useContext(AppContext);
  const {items} = store.state;
  const cn = bem('List');

  const callbacks = {
    addItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, []) 
  };

  return (
    <div className={cn()}>
      {items.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item 
            item={item} 
            addItemToCart={callbacks.addItemToCart}
          />
        </div>
      )}
    </div>
  );
}

List.propTypes = {};

List.defaultProps = {};

export default React.memo(List);
