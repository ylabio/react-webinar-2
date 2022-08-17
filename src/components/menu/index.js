import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function Menu(props) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {props.links.map((link) => (
        <Link to={`${link.to}`} className={cn('link')}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

Menu.propTypes = {
  links: propTypes.array,
};

Menu.defaultProps = {};

export default React.memo(Menu);
