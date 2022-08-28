import React from 'react';
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function CommentsLayout({title, amount, children}){
  const cn = bem('LayoutComments');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title} ({amount})</h2>
      <div className={cn('content')}>{children}</div>
    </div>
  )
}

CommentsLayout.propTypes = {
  title: propTypes.string,
  amount: propTypes.number,
  children: propTypes.node,
}

CommentsLayout.defaultProps = {
  title: 'Комментарии',
  amount: 0,
}

export default React.memo(CommentsLayout);