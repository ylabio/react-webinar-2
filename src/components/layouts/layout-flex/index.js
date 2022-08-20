import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LayoutFlex({children, flex, padding}) {
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, padding})}>
      {React.Children.map(children, child => (
        <div key={child.key} className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between', 'with-gap']),
  padding: propTypes.bool
};

LayoutFlex.defaultProps = {
  flex: 'start',
  padding: true
};

export default React.memo(LayoutFlex);
