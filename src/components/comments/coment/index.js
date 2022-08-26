import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comment({setEditor,comment, textEditor}) {

  // CSS классы по БЭМ
  const cn = bem('Comment');

  const dateConvert = new Date(comment.dateCreate)
  const date = dateConvert.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const time = dateConvert.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})

  return (
    <div className={cn()} style={{paddingLeft: `${String(comment.level * 30)}px`}}>
      <div className={cn('container')}>

        <p className={cn('author')}>{comment.author}</p>
        <p className={cn('data')}>{date} в {time}</p>

      </div>
      <p className={cn('text')}>{comment.text} </p>
      {comment.id!==  textEditor? <div onClick={()=>setEditor(comment.id)} className={cn('answer')}>Ответить</div> : <div className={cn('answer')}>qwe</div> }
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  setEditor: propTypes.func.isRequired,
  textEditor: propTypes.string,
}

Comment.defaultProps = {
  comment: {},
}

export default React.memo(Comment);
