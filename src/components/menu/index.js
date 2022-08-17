import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function Menu(props) {
  const cn = bem('Menu');
  console.log(props.children);

  return (
    <div className={cn()}>
      <Link to={`${props.to}`}>{props.children}</Link>
    </div>
  );
}

Menu.propTypes = {
  children: propTypes.string,
  to: propTypes.string,
};

Menu.defaultProps = {};

export default React.memo(Menu);
