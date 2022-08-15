import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function LayoutArticle({head, children}){
  const cn = bem('LayoutArticle');

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

LayoutArticle.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

LayoutArticle.defaultProps = {
}

export default React.memo(LayoutArticle);
