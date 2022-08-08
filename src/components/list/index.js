import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, option = false}) {
  const cn = bem('List');

  return (
    <ul className={cn()} style={option ? {"margin": "74px 0 0 0"} : null}>
      {items}
    </ul>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  option: propTypes.bool
}

List.defaultProps = {
  items: []
}

export default React.memo(List);
