import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, callback, btnName}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} callback={callback} btnName={btnName} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callback: propTypes.func.isRequired,
  btnName: propTypes.string.isRequired,
}

export default React.memo(List);
