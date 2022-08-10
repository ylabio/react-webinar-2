import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Cart({head, children, onClose}){
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        {head}
        <div className={cn("head__close")}>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
      <div className={cn("content")}>
        {children}
      </div>
    </div>
  )
}

Cart.propTypes = {
  children: propTypes.node,
}

Cart.defaultProps = {
    children: <></>,
}

export default React.memo(Cart);
