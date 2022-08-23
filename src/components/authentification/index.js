import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Authentification({ user, onLogOut, translate, navigate }) {
  const cn = bem('Authentification');

  return (
    <div className={cn()}>
      {user.name && (
        <Link to={'/profile'} className={cn('name')}>
          {user.name}
        </Link>
      )}
      <button
        onClick={() => {
          user.name ? onLogOut() : navigate('/login');
        }}>
        {user.name ? translate('logout') : translate('login')}
      </button>
    </div>
  );
}

Authentification.propTypes = {
  user: propTypes.object.isRequired,
  onLogOut: propTypes.func.isRequired,
  translate: propTypes.func.isRequired,
  navigate: propTypes.func.isRequired,
};

Authentification.defaultProps = {};

export default React.memo(Authentification);
