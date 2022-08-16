import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu(props) {
  const cn = bem('Menu');
  console.log(props.children);

  return (
    <div className={cn()}>
      {React.Children.map(props.children, (child) => {
        if (child.props.to) {
          return <div className={cn('link')}>{child}</div>;
        } else {
          return child;
        }
      })}
    </div>
  );
}

Menu.propTypes = {
  children: propTypes.node,
};

Menu.defaultProps = {};

export default React.memo(Menu);
