import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Profile({ user, t }){
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <span className={cn('title')}>{t('profile.title')}</span>
      <div className={cn('field')}>{t('profile.name')}: <span>{user.name}</span></div>
      <div className={cn('field')}>{t('profile.phone')}: <span>{user.phone}</span></div>
      <div className={cn('field')}>email: <span>{user.email}</span></div>
    </div>
  )
}

Profile.propTypes = {
  user: propTypes.object,
  t: propTypes.func,
}

Profile.defaultProps = {
  user: {},
  t: () => {},
}

export default React.memo(Profile);