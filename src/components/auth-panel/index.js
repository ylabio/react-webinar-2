import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function AuthPanel({ flex, name, profileLink, isLogged, onClick }) {
  const cn = bem('AuthPanel');

  return (
    <div className={cn({ flex })}>
      {isLogged && <Link to={profileLink}>{name}</Link>}
      <button className={cn('button')} onClick={onClick}>
        {isLogged ? 'Выход' : 'Вход'}
      </button>
    </div>
  );
}

AuthPanel.propTypes = {
  flex: propTypes.oneOf(['start', 'end', 'between']),
  name: propTypes.string,
  profileLink: propTypes.string,
  isLogged: propTypes.bool.isRequired,
  onClick: propTypes.func
};

AuthPanel.defaultProps = {
  flex: 'end',
  name: '',
  profileLink: '/',
  onClick: () => {}
};

export default React.memo(AuthPanel);
