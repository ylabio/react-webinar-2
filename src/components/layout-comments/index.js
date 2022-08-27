import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutComments({title, children}){
  const cn = bem('LayoutComments');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {title}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

LayoutComments.propTypes = {
  title: propTypes.node,
  children: propTypes.node,
}

LayoutComments.defaultProps = {
}

export default React.memo(LayoutComments);