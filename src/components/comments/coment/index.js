import ProtectedComments from "containers/protected-comments";
import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comment({comment}) {
  const {dateCreate, level, author, text, id} = comment;
  const cn = bem('Comment');

  const dateConvert = new Date(dateCreate)
  const date = dateConvert.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = dateConvert.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={cn()} style={{paddingLeft: `${String(level * 30)}px`}}>
      <div className={cn('container')}>

        <p className={cn('author')}>{author}</p>
        <p className={cn('data')}>{date} в {time}</p>

      </div>
      <p className={cn('text')}>{text}</p>
      <ProtectedComments id={id} redirect={'/login'}>
        <div className={cn('answer')}>Ответить</div>
      </ProtectedComments>
    </div>
  );
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
}

Comment.defaultProps = {
  comment: {},
}

export default React.memo(Comment);
