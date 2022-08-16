import React from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './styles.css';

function Navbar({ links }) {
  const cn = bem('Navbar');

  return (
    <ul>
      {links.map((item, i) => (
        <li key={i}>
          <Link className={cn('link')} to={item.link}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

Navbar.propTypes = {
  links: propTypes.arrayOf(propTypes.object),
};

Navbar.defaultProps = {
  links: [
    {
      title: 'Главная',
      link: '/',
    },
  ],
};

export default React.memo(Navbar);
