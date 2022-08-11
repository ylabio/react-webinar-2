import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import ItemKatalog from '../../items/item-katalog';
import './style.css';

function ListKatalog(props) {
  const cn = bem('ListKatalog');

  return (
    <div className={cn()}>
      {props.items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <ItemKatalog item={item} onAddItemInCart={props.onAddItemInCart} />
        </div>
      ))}
    </div>
  );
}

ListKatalog.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItemInCart: propTypes.func,
};

ListKatalog.defaultProps = {
  onAddItemInCart: () => {},
};

export default React.memo(ListKatalog);
