import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutComments({head, children}) {

  // CSS классы по БЭМ
  const cn = bem('LayoutComments');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

LayoutComments.propTypes = {
  head: propTypes.node,
  children: propTypes.node
}

LayoutComments.defaultProps = {
  head: '',
  children: ''
}

export default React.memo(LayoutComments);
