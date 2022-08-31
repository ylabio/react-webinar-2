import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CommentForm from '../comment-form';
import AuthWarning from '../auth-warning';
import BranchContainer from '../../containers/branch-container';

function Comments({ 
  items, 
  total, 
  exists, 
  link, 
  createResponse,
  productId,
  branchesState,
 }) {
  const cn = bem('Comments');
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [lastCommentId, setLastCommentId] = useState(null);

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Комментарии ({total})</h2>

      <div className={cn('content')}>
        {items && items.map((branch) => (
          <BranchContainer 
            branch={branch} 
            key={branch[0].comment._id} 
            link={link}
            setShowCommentForm={setShowCommentForm}
            lastCommentId={lastCommentId}
            setLastCommentId={setLastCommentId}
            createResponse={createResponse}
            branchState={
              branch[0].comment._id in branchesState
                ? branchesState[branch[0].comment._id]
                : {[branch[0].comment._id]: false}
            }
          />
        ))}   
      </div>
      
      {exists && showCommentForm && (
        <div className={cn('bottomForm')}>
          <CommentForm 
            type='comment'
            createResponse={createResponse}
            productId={productId}
          />
        </div>          
      )}

      {!exists && showCommentForm && (
        <div className={cn('bottomWarning')}>
          <AuthWarning type='comment' link={link} />
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  items: propTypes.array, 
  total: propTypes.number.isRequired, 
  exists: propTypes.bool.isRequired, 
  link: propTypes.string.isRequired, 
  createResponse: propTypes.func.isRequired,
  productId: propTypes.string.isRequired,
  branchState: propTypes.oneOfType([
    propTypes.object.isRequired, 
    propTypes.bool.isRequired
  ]),
};

Comments.defaultProps = {
  items: [],
};

export default React.memo(Comments);