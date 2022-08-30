import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function FormAnswer({id, changeId, t, textPlaceholder, padding, attemptAddNewComment}) {
  const cn = bem('FormAnswer');

  const [textComment, changeTextComment] = useState('');
 
  const formSubmit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const comment = form['comment'].value;
    attemptAddNewComment(comment, id, 'comment');
    changeId('');
  }

  return (
    <div className={cn()} style={{'paddingLeft': 40 + padding}}>
      <form onSubmit={formSubmit}>
        <div className={cn('comment')}>
          <div className={cn('new-res')}>
            <strong>{t('comments.newAnswer')}</strong>
          </div>
          <textarea id='comment' value={textComment} onChange={(e)=>changeTextComment(e.target.value)} placeholder={textPlaceholder}/>
          <button className={cn('btn1')} type='submit'>{t('comments.sendButtonName')}</button>
        </div>
     </form>
     <button className={cn('btn2')} onClick={()=>{changeId('')}}>{t('comments.cancelButtonName')}</button>
  </div>
  )
}

FormAnswer.propTypes = {
  id: propTypes.string.isRequired,
  changeId: propTypes.func.isRequired,
  t: propTypes.func,
  textPlaceholder: propTypes.string,
  padding: propTypes.number
}

FormAnswer.defaultProps = {
  t: (text) => text,
  textPlaceholder: '',
  padding: 0
}

export default React.memo(FormAnswer);
