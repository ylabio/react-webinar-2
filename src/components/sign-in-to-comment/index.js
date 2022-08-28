import React from 'react';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SignInToComment({backId, level, text, onCancel, isAnswer}) {
  const cn = bem('SignInToComment');
  return (
    <div style={{paddingLeft: `${level * 30}px`}} className={cn()}>
      <Link to={'/login'} state={{back: `/articles/${backId}`}}>
          {text.signIn}
      </Link>
        {text.toCanReply + ' '}
        {isAnswer && <button className={cn('cancel')} onClick={onCancel}>{text.cancel}</button>}
    </div>
  );
}

export default React.memo(SignInToComment);
