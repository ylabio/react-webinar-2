import React, { useCallback, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import dateTimeFormat from '../../../utils/date-time-format';

function Comment(props) {
  const cn = bem('Comment');

  const ref = useRef(null);

  useEffect(() => {
    props.isFocus && ref.current.focus();
  }, []);

  const callbacks = {
    // Ответить на комментарий
    answer: useCallback(() => {
      props.setCurrentAnswer(props.id);
    }, [props.id])
  };

  return (
    <div className={cn({ indent: props.level > 10 ? 10 : props.level })} ref={ref} tabIndex="0">
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
  isFocus: PropTypes.bool.isRequired,
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
