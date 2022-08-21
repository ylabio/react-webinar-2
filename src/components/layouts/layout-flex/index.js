import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutFlex({children, flex, padding, px, py}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, padding, px, py})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  px: propTypes.oneOf(['small', 'normal', 'larger']),
  py: propTypes.oneOf(['small', 'normal', 'larger']),
  padding: propTypes.bool
}

LayoutFlex.defaultProps = {
  flex: 'start',
  padding: true,
  px: 'normal',
  py: 'normal',
}

export default React.memo(LayoutFlex);
