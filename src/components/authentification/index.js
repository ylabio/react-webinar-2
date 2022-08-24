import React, { useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import { Link, Navigate } from 'react-router-dom';

function Authentification({ user, onLogOut, translate, navigate, locationState }) {
  const cn = bem('Authentification');
  const state = { ...locationState };

  function nav() {
    console.log(state);
    navigate('/login', { replace: false, state: { ...state } });
  }

  return (
    <div className={cn()}>
      {user.name && (
        <Link to={'/profile'} className={cn('name')}>
          {user.name}
        </Link>
      )}
      {user.name ? (
        <button onClick={() => onLogOut()}>{translate('logout')}</button>
      ) : (
        <Link to={'/login'} state={state} className='button'>
          {translate('login')}
        </Link>
      )}
    </div>
  );
}

Authentification.propTypes = {
  user: propTypes.object.isRequired,
  onLogOut: propTypes.func.isRequired,
  translate: propTypes.func.isRequired,
  navigate: propTypes.func.isRequired,
  locationState: propTypes.object.isRequired,
};

Authentification.defaultProps = {};

export default React.memo(Authentification);
