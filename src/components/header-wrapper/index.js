import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function HeaderWrapper({children}) {
  const cn = bem('HeaderWrapper');

  return (
    <div className={cn('')}>{children}</div>
  )
}

HeaderWrapper.propTypes = {
  children: propTypes.node,
}

HeaderWrapper.defaultProps = {
}

export default React.memo(HeaderWrapper);
