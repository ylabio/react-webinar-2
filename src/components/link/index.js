import React from 'react';
import {Link as NavLink} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Link({ link, color, children }) {
  const cn = bem('Link');

  return (
    <NavLink className={cn({color})} to={link}>
      {children}
    </NavLink>
  )
}

Link.propTypes = {
  link: propTypes.string,
  color: propTypes.string,
  children: propTypes.node,
}

Link.defaultProps = {
}

export default React.memo(Link);
