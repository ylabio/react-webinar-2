import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';
import propTypes from 'prop-types';

const LoginTools = ({ userName, onLogout }) => {
  const cn = bem('LoginTools');

  return (
    <div className={cn()}>
      <Link className={cn('userName')} to={'/profile'}>
        {userName}
      </Link>
      {userName ? (
        <button className={cn('btn')} onClick={() => onLogout()}>
          Выход
        </button>
      ) : (
        <Link to={'/login'}>
          <button className={cn('btn')}>Войти</button>
        </Link>
      )}
    </div>
  );
};

export default LoginTools;
