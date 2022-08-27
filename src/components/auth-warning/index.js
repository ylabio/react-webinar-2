import React from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";

function AuthWarning({ type, link }) {
  const cn = bem('AuthWarning');

  return (
    <div className={cn()}>
      <Link to={link} className={cn('link')}>Войдите</Link>
      {type === 'comment' && (
        <span className={cn('text')}>, чтобы иметь возможность комментировать</span>
      )}
      {type === 'answer' && (
        <span className={cn('text')}>
          <span>, чтобы иметь возможность ответить. </span>  
          <span className={cn('cancel')}>Отмена</span>
        </span>
      )}
    </div>
  );
}

export default AuthWarning;