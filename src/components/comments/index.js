import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CommentForm from '../comment-form';
import CommentsBranch from '../comments-branch';

function Comments({ items, total }) {
  const cn = bem('Comments');

  console.log({items})

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Комментарии ({total})</h2>

      <div className={cn('content')}>
        {items && items.map((branch, idx) => (
          <CommentsBranch branch={branch} key={idx} />
        ))}   
      </div>
      
      <CommentForm />
    </div>
  );
}

Comments.propTypes = {
};

Comments.defaultProps = {
};

export default Comments;