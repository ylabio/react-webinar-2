import React, { useCallback, useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { formatTime } from '../../utils/format-time';
import CommentForm from '../comment-form';
import AuthWarning from '../auth-warning';

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
}) {
  const cn = bem('Comment');
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const commentRef = useRef(null);

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

  useEffect(() => {
    if (lastCommentId !== data._id) {
      setShowAnswerForm(false);
    }
  }, [lastCommentId])

  useEffect(() => {
    const fromTop = commentRef.current.getBoundingClientRect().top;
    addCommentPosition(data._id, fromTop);
  }, [])

  return (
    <div 
      className={cn()} 
      style={{marginLeft: String(30 * lvl) + 'px'}} 
      ref={commentRef}
    >
      <div className={cn('body')}>
        <div className={cn('header')}>
          <span className={cn('username')}>{data.author.profile.name}</span>
          <span className={cn('time')}>{formatTime(data.dateUpdate)}</span>
        </div>

        <p className={cn('text')}>
          {data.text}
        </p>

        {showResponse && (
          <span 
            className={cn('answer')}
            onClick={callbacks.showFormHandler}
          >
            Ответить
          </span>
        )}
      </div>

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
};

Comment.defaultProps = {
  lastCommentId: '',
  showResponse: true,
};

export default React.memo(Comment);

