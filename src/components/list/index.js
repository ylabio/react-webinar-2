import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function List({items, renderItem}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item._id} className={cn('item')}>
        {renderItem(item)}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func.isRequired
}

export default React.memo(List);
