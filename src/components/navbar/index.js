import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function NavBar({children}){
  const cn = bem('NavBar');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

NavBar.propTypes = {
  children: propTypes.node
}

NavBar.defaultProps = {
}

export default React.memo(NavBar);
