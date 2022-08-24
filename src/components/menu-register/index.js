import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function MenuRegister({onLogout, token, authName, user, t}) {
  const cn = bem('MenuRegister');

  return (
    <div className={cn()}>
      {token ?
      <>
        <Link to='/profile' className={cn('profile')}>{authName}</Link>
        <button className={cn('btn')} onClick={onLogout}>{t('menuRegister.exit')}</button>
      </> : <div className={cn('btn')}><Link to='/login'>{t('menuRegister.login')}</Link></div>
      }
    </div>
  )
}

MenuRegister.propTypes = {
  t: propTypes.func,
  onLogout: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  token: propTypes.string,
  authName: propTypes.string,
}

MenuRegister.defaultProps = {
  t: (text) => text,
  onLogout: () => {},
  user: {}
}

export default React.memo(MenuRegister);
