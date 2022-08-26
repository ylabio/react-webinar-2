import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CommentForm from '../comment-form';

function Comments({ items }) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Комментарии ({items && items.length})</h2>

      <div className={cn('content')}>
        
      </div>
      
      <CommentForm />
    </div>
  );
}

export default Comments;