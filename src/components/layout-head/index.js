import React from 'react';
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function LayoutHead({title, children}){
  const cn = bem('LayoutHead');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{title}</h1>
      <div className={cn('side')}>{children}</div>
    </div>
  )
}

LayoutHead.propTypes = {
  title: propTypes.string,
  children: propTypes.node,
}

LayoutHead.defaultProps = {
}

export default React.memo(LayoutHead);
