import React from 'react'
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css'


function Header({logout, user, isAuth}) {
  const cn = bem('header');
  const {t} = useTranslate();

  return (
    <div className={cn()}>
      {isAuth
        ?
        <>
          <Link className={cn('link')} to={'/profile'}>{user.name}</Link>
          <button onClick={logout}>{t('header.logout')}</button>
        </>
        :
        <button>
          <Link className={cn('button')} to={'/login'}>{t('header.login')}</Link>
        </button>
      }
    </div>
  )
}


export default Header;

Header.propTypes = {
  logout: propTypes.func.isRequired,
  token: propTypes.string,
  user: propTypes.object,
}