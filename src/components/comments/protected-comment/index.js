import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function ProtectedComment({ redirect, newReply, onCancel }) {
  const cn = bem('ProtectedComment');

  const bodyText = newReply
    ? ', чтобы иметь возможность ответить.'
    : ', чтобы иметь возможность комментировать';

  return (
    <div className={newReply ? cn() : cn({ padding: true })}>
      <Link className={cn('link')} to={redirect}>
        Войдите
      </Link>
      {bodyText}
      {newReply && (
        <button className={cn('button')} onClick={onCancel}>
          Отмена
        </button>
      )}
    </div>
  );
}

ProtectedComment.propTypes = {
  redirect: propTypes.string.isRequired,
  newReply: propTypes.string.isRequired,
  onCancel: propTypes.func,
};

ProtectedComment.defaultProps = {
  onCancel: () => {},
};

export default React.memo(ProtectedComment);
