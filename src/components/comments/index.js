import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CommentForm from '../comment-form';
import CommentsBranch from '../comments-branch';
import AuthWarning from '../auth-warning';

function Comments({ 
  items, 
  total, 
  exists, 
  link, 
  createResponse,
  productId,
 }) {
  const cn = bem('Comments');
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [lastCommentId, setLastCommentId] = useState(null);

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Комментарии ({total})</h2>

      <div className={cn('content')}>
        {items && items.map((branch, idx) => (
          <CommentsBranch 
            branch={branch} 
            key={idx} 
            exists={exists}
            link={link}
            setShowCommentForm={setShowCommentForm}
            lastCommentId={lastCommentId}
            setLastCommentId={setLastCommentId}
            createResponse={createResponse}
          />
        ))}   
      </div>
      
      <div className={cn('bottom')}>
        {exists && showCommentForm && (
          <CommentForm 
            type='comment'
            createResponse={createResponse}
            productId={productId}
          />
        )}

        {!exists && showCommentForm && (
          <AuthWarning type='comment' link={link} />
        )}
      </div>
    </div>
  );
}

Comments.propTypes = {
};

Comments.defaultProps = {
};

export default Comments;