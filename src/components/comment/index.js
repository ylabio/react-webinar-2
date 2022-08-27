import React, { useEffect, useState } from 'react';
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
}) {
  const cn = bem('Comment');
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  function showFormHandler() {
    setLastCommentId(data._id);
    setShowAnswerForm(true);
    setShowCommentForm(false);
  }

  function cancelFormHandler() {
    setShowAnswerForm(false);
    setShowCommentForm(true);
  }

  useEffect(() => {
    if (lastCommentId !== data._id) {
      setShowAnswerForm(false);
    }
  }, [lastCommentId])

  return (
    <div className={cn()} style={{marginLeft: String(30 * lvl) + 'px'}}>
      <div className={cn('body')}>
        <div className={cn('header')}>
          <span className={cn('username')}>{data.author.profile.name}</span>
          <span className={cn('time')}>{formatTime(data.dateUpdate)}</span>
        </div>

        <p className={cn('text')}>
          {data.text}
        </p>

        <span 
          className={cn('answer')}
          onClick={showFormHandler}
        >Ответить</span>
      </div>

      {exists && showAnswerForm && (
        <div className={cn('bottom')}>
         <CommentForm 
           type='answer' 
           closeCB={cancelFormHandler}
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
            closeCB={cancelFormHandler} 
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
};

Comment.defaultProps = {
  lastCommentId: '',
};

export default React.memo(Comment);