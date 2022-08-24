import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

function LoginPanel(props) {
  const cn = bem('Panel');
  return (
    <>
      {props.loggedIn ? (
        <>
          <div
            className={cn('profile')}
            onClick={() => {
              props.moveToProfile();
            }}>
            {props.user.profile?.name}
          </div>
          <button
            className={cn('button')}
            onClick={() => {
              props.logout(localStorage.getItem('token'));
            }}>
            Выход
          </button>
        </>
      ) : (
        <div className={cn()}>
          <button
            className={cn('button')}
            onClick={() => {
              props.moveToLogin();
            }}>
            Вход
          </button>
        </div>
      )}
    </>
  );
}

LoginPanel.propTypes = {
  user: propTypes.object.isRequired,
  loggedIn: propTypes.bool.isRequired,
  moveToLogin: propTypes.func,
  moveToProfile: propTypes.func,
};

LoginPanel.defaultProps = {
  moveToLogin: () => {},
  moveToProfile: () => {},
};

export default React.memo(LoginPanel);
