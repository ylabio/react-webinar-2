import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';
import propTypes from 'prop-types';

const LoginTools = ({ userName, onLogout, t }) => {
  const cn = bem('LoginTools');

  return (
    <div className={cn()}>
      <Link className={cn('userName')} to={'/profile'}>
        {userName}
      </Link>
      {userName ? (
        <button className={cn('btn')} onClick={() => onLogout()}>
          {t('auth.quit')}
        </button>
      ) : (
        <Link to={'/login'}>
          <button className={cn('btn')}>{t('auth.login')}</button>
        </Link>
      )}
    </div>
  );
};

LoginTools.propTypes = {
  userName: propTypes.string,
  onLogout: propTypes.func,
  t: propTypes.func,
};

LoginTools.defaultProps = {
  t: (text) => text,
};

export default React.memo(LoginTools);
