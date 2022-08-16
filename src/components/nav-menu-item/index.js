import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';


function NavMenuItem(props) {
  const {title, link} = props.link;
  const cn = bem('NavMenuItem');

  return (
    <Link className={cn()} to={`${link}`}>{title}</Link>
  )
}

export default React.memo(NavMenuItem);

NavMenuItem.propTypes ={
  link: propTypes.object.isRequired,
}
