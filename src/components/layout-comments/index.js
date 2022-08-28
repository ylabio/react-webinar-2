import {cn as bem} from '@bem-react/classname';
import React from 'react';
import ProtectedCommentForm from '../../containers/protected-comment-form';
import Comment from '../comment';
import './style.css';

function LayoutComments( {total, text, children}) {
  const cn = bem('LayoutComments');
  return (
    <div className={cn()}>
      <h2 className={cn('head')}>{text.head} {`(${total})`}</h2>
      <div className={cn('body')}>{children}</div>
    </div>
  );
}

export default React.memo(LayoutComments);
