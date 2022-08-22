import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css';
import LocaleSelect from '../../containers/locale-select';
import LayoutFlex from '../layout-flex';
import { Link } from 'react-router-dom';

function Header({ isAuth, title, userName, userId, logout }) {
  const cn = bem('Header');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        <LayoutFlex flex="end" padding={false}>
          {!isAuth ? (
            <Link to="/login">
              <button>Вход</button>
            </Link>
          ) : (
            <>
              <Link to={`/profile/${userId}`} className={cn('user')}>
                {userName}
              </Link>
              <Link onClick={() => logout()} to="/login">
                <button>Выход</button>
              </Link>
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
  userId: propTypes.string,
  logout: propTypes.func,
};

Header.defaultProps = {
  title: 'title',
  logout: () => {},
};

export default React.memo(Header);
