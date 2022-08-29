import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function LoginRequest(props) {
  const cn = bem('LoginRequest');
  return (
    <div className={cn()}>
      <span className={cn('login')} onClick={props.onLoginClick}>
        Войдите
      </span>
      , чтобы иметь возможность комментировать.{' '}
      <span className={cn('cancel')}>{props.cancel}</span>
    </div>
  );
}
LoginRequest.propTypes = {
  onLoginClick: propTypes.func,
  cancel: propTypes.func,
};

LoginRequest.defaultProps = {};

export default React.memo(LoginRequest);
