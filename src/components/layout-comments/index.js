import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutComments({head, children}){
  const cn = bem('LayoutComments');

  return (
    <div className={cn()}>
      <h2 className={cn('head')}>
        {head}
      </h2>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

LayoutComments.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

LayoutComments.defaultProps = {
}

export default React.memo(LayoutComments);