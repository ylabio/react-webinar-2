import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function FormAddComment({id, attemptAddNewComment, t}) {
  const cn = bem('FormAddComment');

  const [textComment, changeTextComment] = useState(t('comments.text'));
  
  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const comment = form['comment'].value;
    attemptAddNewComment(comment, id, 'article');
  }
  
  return (
    <div className={cn()} onSubmit={formSubmit}>
      <div className={cn('new-comment')}>
        <strong>{t('comments.newComment')}</strong>
      </div>
      <form>
        <textarea id='comment' value={textComment} onChange={(e)=>changeTextComment(e.target.value)}/>
        <div><button type='submit' disabled={textComment.trim()===''}>{t('comments.sendButtonName')}</button></div>
      </form>
    </div>
  )
}

FormAddComment.propTypes = {
  id: propTypes.string.isRequired,
  attemptAddNewComment: propTypes.func.isRequired,
  t: propTypes.func
}

FormAddComment.defaultProps = {
  t: (text) => text,
}

export default React.memo(FormAddComment);
