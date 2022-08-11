import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function LayoutModal({head, btn, children}){
  const cn = bem('LayoutModal');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
        {btn}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

LayoutModal.propTypes = {
  head: propTypes.node,
  btn: propTypes.node,
  children: propTypes.node,
}

LayoutModal.defaultProps = {
}

export default React.memo(LayoutModal);
