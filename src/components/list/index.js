import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, actionHandler}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} actionHandler={actionHandler}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  actionHandler: propTypes.func,
}

List.defaultProps = {
  items: [],
  actionHandler: () => {},
}

export default  React.memo(List);
