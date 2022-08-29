import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function Comment(props) {
  const cn = bem('Comment');

  const day = new Date(props.comment.date).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = new Date(props.comment.date).toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const onShowClick = () => {
    props.show(props.comment.id);
  };

  return (
    <div className={cn()} style={{ paddingLeft: props.comment.padding }}>
      <h4 className={cn('head')}>
        <span> {props.comment.author} </span>
        <span className={cn('date')}>
          {day} в {time}
        </span>
      </h4>
      <p className={cn('text')}>{props.comment.text}</p>

      <p className={cn('answer-button')} onClick={onShowClick}>
        Ответить
      </p>
      {props.children}
    </div>
  );
}

Comment.propTypes = {
  comment: propTypes.object,
  show: propTypes.func,
};

Comment.defaultProps = {};

export default React.memo(Comment);
