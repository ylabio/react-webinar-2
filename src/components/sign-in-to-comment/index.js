import React from 'react';
import {Link} from 'react-router-dom';

function SignInToComment({backId, level}) {
  return (
    <div style={{paddingLeft: `${level * 30}px`}}>
      <Link to={'/login'} state={{back: `/articles/${backId}`}}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать
    </div>
  );
}

export default React.memo(SignInToComment);
