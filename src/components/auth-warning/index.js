import React, { useCallback } from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';

function AuthWarning({ type, link, closeCB }) {
  const cn = bem('AuthWarning');

  const callbacks = {
    cancelHandler: useCallback(() => closeCB(), [])
  };

  return (
    <div className={cn()}>
      <Link to={link} className={cn('link')}>Войдите</Link>
      {type === 'comment' && (
        <span className={cn('text')}>, чтобы иметь возможность комментировать</span>
      )}
      {type === 'answer' && (
        <span className={cn('text')}>
          <span>, чтобы иметь возможность ответить. </span>  
          <span 
            className={cn('cancel')}
            onClick={callbacks.cancelHandler}
          >
            Отмена
          </span>
        </span>
      )}
    </div>
  );
}

AuthWarning.propTypes = {
  type: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  closeCB: propTypes.func,
};

AuthWarning.defaultProps = {
  closeCB: () => {},
};

export default React.memo(AuthWarning);