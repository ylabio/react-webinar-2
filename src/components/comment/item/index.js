import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import formatDate from '../../../utils/format-date';
import './style.css';

/**
 * Component description
 */

function CommentItem({ id, user, mine, date, text, onReply, shift, t }) {
  const cn = bem('CommentItem');

  return (
    <div className={cn()} style={{ paddingLeft: 30 * shift > 300 ? '300px' : (30 * shift) + 'px' }}>
      <div className={cn('title')}>
        <div className={mine ? cn('mine') : cn('user')}>{user.name}</div>
        <div className={cn('date')}>
          {formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' }).slice(0, -3) + ' в '}
          {formatDate(date, { hour: 'numeric', minute: 'numeric', })}
        </div>
      </div>
      <div className={cn('text')}>{text}</div>
      <div className={cn('reply')} onClick={() => onReply(id)}>{t('comments.reply')}</div>
    </div>
  );
}

CommentItem.propTypes = {
  id: propTypes.string.isRequired,
  user: propTypes.object,
  mine: propTypes.bool,
  date: propTypes.string,
  text: propTypes.string,
  onReply: propTypes.func,
  shift: propTypes.number,
  t: propTypes.func
}

CommentItem.defaultProps = {
  user: { name: 'someone' },
  mine: false,
  date: '',
  text: '',
  onReply: () => { },
  shift: 0,
  t: () => { }
}

export default React.memo(CommentItem);