import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function NavMenu(props) {
  const cn = bem('NavMenu');
  return (
    <div className={cn()}>
      <Link to={`${props.onLink}`} className={cn('link') }>{props.title}</Link>
    </div>
  )
}

NavMenu.propTypes = {
  onLink: propTypes.string.isRequired,
  title: propTypes.string
}

NavMenu.defaultProps = {
  title: 'Link'
}

export default React.memo(NavMenu);