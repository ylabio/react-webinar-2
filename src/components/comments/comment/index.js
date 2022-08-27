import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import dateTimeFormat from '../../../utils/date-time-format';

function Comment(props) {
  const cn = bem('Comment');

  const callbacks = {
    // Ответить на комментарий
    answer: useCallback(() => {
      props.setCurrentAnswer(props.id);
    }, [props.id])
  };

  return (
    <div className={cn({ indent: props.level > 10 ? 10 : props.level })}>
      <div>
        <span className={cn('user')}>{props.user}</span>
        <span className={cn('date')}>
            {dateTimeFormat(new Date(props.date), props.locale)}
        </span>
      </div>
      <p className={cn('text')}>{props.text}</p>
      <button className={cn('button')} onClick={callbacks.answer}>{props.reply}</button>
      {props.children}
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  setCurrentAnswer: PropTypes.func,
  user: PropTypes.string,
  date: PropTypes.string,
  locale: PropTypes.string,
  level: PropTypes.number,
  reply: PropTypes.string.isRequired,
  children: PropTypes.node
};

Comment.defaultProps = {
  setCurrentAnswer: () => {},
  user: 'User',
  date: Date.now(),
  locale: window.navigator.language,
  level: 0
};

export default React.memo(Comment);
