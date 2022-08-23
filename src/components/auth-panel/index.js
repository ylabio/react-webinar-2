import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function AuthPanel({ flex, name, profileLink, isLogged, onClick, t }) {
  const cn = bem('AuthPanel');

  return (
    <div className={cn({ flex })}>
      {isLogged && <Link to={profileLink}>{name}</Link>}
      <button className={cn('button')} onClick={onClick}>
        {isLogged ? t('authPanel.signOut') : t('authPanel.signIn')}
      </button>
    </div>
  );
}

AuthPanel.propTypes = {
  flex: propTypes.oneOf(['start', 'end', 'between']),
  name: propTypes.string,
  profileLink: propTypes.string,
  isLogged: propTypes.bool.isRequired,
  onClick: propTypes.func,
  t: propTypes.func
};

AuthPanel.defaultProps = {
  flex: 'end',
  name: '',
  profileLink: '/',
  onClick: () => {},
  t: (text) => text
};


export default React.memo(AuthPanel);
