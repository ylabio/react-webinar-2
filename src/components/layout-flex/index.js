import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutFlex({children, flex, indent}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, indent})}>
      {React.Children.map(children, (child) => (
        child && <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  indent: propTypes.oneOf(['small', 'big']),
}

LayoutFlex.defaultProps = {
  flex: 'start',
}

export default React.memo(LayoutFlex);
