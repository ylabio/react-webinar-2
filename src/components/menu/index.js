import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Menu({link, title}) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <Link to={`${link}`} className={cn('link') }>{title}</Link>
    </div>
  )
}

Menu.propTypes = {
  link: propTypes.string.isRequired,
  title: propTypes.string
}

Menu.defaultProps = {
  title: 'Menu'
}

export default React.memo(Menu);