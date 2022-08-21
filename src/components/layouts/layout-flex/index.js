import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LayoutFlex({children, flex, padding, direction, align}) {
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex, padding, direction, align})}>
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
  direction: propTypes.oneOf(['column', 'row']),
  padding: propTypes.bool,
  align: propTypes.oneOf(['start', 'end', 'center'])
};

LayoutFlex.defaultProps = {
  flex: 'start',
  direction: 'row',
  padding: true,
  align: 'center'
};

export default React.memo(LayoutFlex);
