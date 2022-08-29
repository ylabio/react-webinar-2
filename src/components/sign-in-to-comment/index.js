import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function SignInToComment({backId, level, text, onCancel, isAnswer}) {
  const cn = bem('SignInToComment');
  return (
    <div className={`${cn()} comment-inset_${level > 10 ? 10 : level}`}>
      <Link to={'/login'} state={{back: `/articles/${backId}`}}>
        {text.signIn}
      </Link>
      {text.toCanReply + ' '}
      {isAnswer && (
        <button className={cn('cancel')} onClick={onCancel}>
          {text.cancel}
        </button>
      )}
    </div>
  );
}

SignInToComment.propTypes = {
  backId: propTypes.string.isRequired,
  level: propTypes.number.isRequired,
  text: propTypes.objectOf(propTypes.string).isRequired,
  isAnswer: propTypes.bool.isRequired,
  onCancel: propTypes.func
};

export default React.memo(SignInToComment);
