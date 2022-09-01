import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatDateIsoString} from '../../utils/format-date';

function CommentCard(props) {
  const cn = bem('CommentCard');

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('author')}>{props.author}</div>
        <div className={cn('date')}>{formatDateIsoString(props.date)}</div>
      </div>
      <div className={cn('content')}>{props.content}</div>
      <div className={cn('cta')}>
        <button
          name={'reply'}
          onClick={() => {
            props.onReply(true);
          }}
        >
          Ответить
        </button>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  auhtor: propTypes.string,
  date: propTypes.string,
  content: propTypes.string,
  onReply: propTypes.func
};

CommentCard.defaultProps = {};

export default React.memo(CommentCard);
