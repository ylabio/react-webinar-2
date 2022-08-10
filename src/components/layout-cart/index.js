import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function LayoutCart({head, children}){
  const cn = bem('LayoutCart');

  return (
    <div className={cn('over')}>
        <div className={cn()}>
            <div className={cn('head')}>
            {head}
            </div>
            <div className={cn('content')}>
            {children}
            </div>
        </div>
    </div>
  )
}

LayoutCart.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

LayoutCart.defaultProps = {
}

export default React.memo(LayoutCart);
