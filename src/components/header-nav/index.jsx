import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

const HeaderNav = ({ links }) => {
  return (
    <nav className='header-nav'>
      {links.map((item, index) =>
        <Link key={index} to={item.route} className='header-nav__link'>{item.title}</Link>
      )}
    </nav>
  )
};

HeaderNav.propTypes = {
  links: propTypes.arrayOf(propTypes.object),
};

HeaderNav.defaultProps = {
  links: [{ title: 'На главную', route: '/' }]
};

export default HeaderNav;