import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom';

function Navigation({children}) {
  const cn = bem('Navigation');

  return (
    <div className={cn('')}>{children}</div>
  )
}

Navigation.propTypes = {
  children: propTypes.node,
}

Navigation.defaultProps = {
}

export default React.memo(Navigation);
