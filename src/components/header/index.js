import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Header(props) {
  const cn = bem('Header');
  return (
    <div className={cn()}>
        {props.children}
    </div>
  )
}

export default React.memo(Header);

Header.propTypes = {
  children: propTypes.node.isRequired,
}
