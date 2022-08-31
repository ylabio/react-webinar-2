import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ comment, lang, t, user, setShowForm }) {
  const cn = bem('Comment');
  return (
    <>
      {comment && (
        <div className={cn()}>
          <div className={cn('Head')}>
            <div className={cn('User')}>{user.profile.name}</div>
            <div className={cn('Date')}>
              {new Date(comment.dateCreate).toLocaleDateString(lang)}
            </div>
          </div>
          <div className={cn('Text')}>{comment.text}</div>
          <div
            className={cn('Reply')}
            onClick={() => {
              setShowForm(comment._id);
            }}>
            {t('comment.reply')}
          </div>
        </div>
      )}
    </>
  );
}

Comment.propTypes = {
  comments: propTypes.array,
  t: propTypes.func.isRequired,
  lang: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
};

Comment.defaultProps = {
  userId: '',
};

export default React.memo(Comment);
