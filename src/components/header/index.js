import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css';
import LocaleSelect from '../../containers/locale-select';
import LayoutFlex from '../layout-flex';
import { Link } from 'react-router-dom';

function Header({ isAuth, title, userName, logout, t, disabledLogout }) {
  const cn = bem('Header');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        <LayoutFlex flex="end" padding={false}>
          {!isAuth ? (
            <Link to="/login">
              <button>{t('auth.login')}</button>
            </Link>
          ) : (
            <>
              <Link to={`/profile`} className={cn('user')}>
                {userName}
              </Link>
              <button onClick={() => logout()} disabled={disabledLogout}>
                {t('auth.logout')}
              </button>
            </>
          )}
        </LayoutFlex>
      </div>
      <div className={cn('bottom')}>
        <LayoutFlex flex="between">
          <h1>{title}</h1>
          <LocaleSelect />
        </LayoutFlex>
      </div>
    </div>
  );
}

Header.propTypes = {
  isAuth: propTypes.bool.isRequired,
  title: propTypes.string,
  userName: propTypes.string,
  logout: propTypes.func,
  t: propTypes.func,
  disabledLogout: propTypes.bool,
};

Header.defaultProps = {
  title: 'title',
  logout: () => {},
  t: (text) => text,
  disabledLogout: false,
};

export default React.memo(Header);
