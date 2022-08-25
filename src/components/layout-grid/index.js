import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutGrid({children, flex, padding}){
  const cn = bem('LayoutGrid');

  return (
    <div className={cn({flex, padding})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutGrid.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  padding: propTypes.bool
}

LayoutGrid.defaultProps = {
  flex: 'start',
  padding: true,
}

export default React.memo(LayoutGrid);
