import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutFlex({children, flex, padding, paddingMin}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, padding, paddingMin})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  padding: propTypes.bool,
  paddingMin: propTypes.bool
}

LayoutFlex.defaultProps = {
  flex: 'start',
  padding: true,
  paddingMin: false
}

export default React.memo(LayoutFlex);
