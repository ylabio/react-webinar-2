import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutProfile({children, flex, padding, head, t}){
  const cn = bem('LayoutProfile');

  return (
    <div className={cn({flex, padding})}>
      <div className={cn('head')}>
        {head}
      </div>
      {React.Children.map(children, (child) => (
        
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

LayoutProfile.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  padding: propTypes.bool
}

LayoutProfile.defaultProps = {
  flex: 'start',
  padding: true,
}

export default React.memo(LayoutProfile);
