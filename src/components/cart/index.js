import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Cart({children}) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

Cart.propTypes = {
  children: propTypes.node
}

Cart.defaultProps = {
  children: ''
}

export default React.memo(Cart);