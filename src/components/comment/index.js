import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CommentForm from '../comment-form';
import AuthWarning from '../auth-warning';
import CommentBody from './comment-body';
import useHelper from './use-helper';

function Comment({ 
  data,
  lvl,
  exists,
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId,
  createResponse,
  showResponse,
  addCommentPosition,
  lastCreatedId,
}) {
  const cn = bem('Comment');
  const [
    showAnswerForm, 
    setShowAnswerForm, 
    commentRef
  ] = useHelper({ 
      lastCommentId, 
      addCommentPosition, 
      lastCreatedId, 
      data
  });

  const callbacks = {
    showFormHandler: useCallback((e) => {
      setLastCommentId(data._id);
      setShowAnswerForm(true);
      setShowCommentForm(false);
    }, [data._id]),
    
    cancelFormHandler: useCallback(() => {
      setShowAnswerForm(false);
      setShowCommentForm(true);
    }, []),
  };

  return (
    <div 
      className={cn()} 
      style={{marginLeft: String(30 * lvl) + 'px'}} 
      ref={commentRef}
    >
      <CommentBody 
        data={data}
        showResponse={showResponse}
        showFormHandler={callbacks.showFormHandler}
      />

      {exists && showAnswerForm && (
        <div className={cn('bottom')}>
         <CommentForm 
           type='answer' 
           closeCB={callbacks.cancelFormHandler}
           comment={data}
           createResponse={createResponse} 
         /> 
        </div>             
      )}
        
      {!exists && showAnswerForm && (
        <div className={cn('bottom')}>
          <AuthWarning 
            type='answer' 
            link={link}
            closeCB={callbacks.cancelFormHandler} 
          />
        </div>
      )}           
      
    </div>
  );
}

Comment.propTypes = {
  data: propTypes.object.isRequired,
  lvl: propTypes.number.isRequired,
  exists: propTypes.bool.isRequired,
  link: propTypes.string.isRequired,
  setShowCommentForm: propTypes.func.isRequired,
  lastCommentId: propTypes.string,
  setLastCommentId: propTypes.func.isRequired,
  createResponse: propTypes.func.isRequired,
  showResponse: propTypes.bool,
  addCommentPosition: propTypes.func,
  lastCreatedId: propTypes.string,
};

Comment.defaultProps = {
  lastCommentId: '',
  showResponse: true,
  addCommentPosition: () => {},
  lastCommentId: null,
};

export default React.memo(Comment);

