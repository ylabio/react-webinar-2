import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import TextArea from '../text-area';
import {cn as bem} from "@bem-react/classname"

function CommentFild({sendComment, cancelComment, text, place, changeText, exists, link, placeholder}){

  const cn = bem('CommentFild');

  if(exists) {

    return (
      <div className={cn('')}>
      <div className={cn('head')}> {place==='article'?'Новый комментарий':'Новый ответ'}</div>
      <TextArea value={text} changeText={changeText} placeholder={placeholder}/>
      <button onClick={sendComment} className={cn('send')}>Отправить</button>
      {place==='comment'&&<button onClick={cancelComment} className={cn('cancelLogIn')}>Отмена</button>}
    </div>
  )
  }
  else{
    return (
      <div className={cn('')}>
         <button onClick={link} className={cn('Sign')} >Войдите</button>,
         {place==='comment'?' чтобы иметь возможность ответить. ':' чтобы иметь возможность комментировать.'} 
         {place==='comment'&&<button onClick={cancelComment} className={cn('cancelLogout')}>Отмена</button>}
      </div>
    )
  }
}
CommentFild.propTypes = {
  text: propTypes.string,
  place: propTypes.string,
  cancelComment: propTypes.func,
  sendComment: propTypes.func,
  changeText: propTypes.func,
  link: propTypes.func,
  exists: propTypes.bool,
  placeholder: propTypes.string
}

export default React.memo(CommentFild);
