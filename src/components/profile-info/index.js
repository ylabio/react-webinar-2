import {cn as bem} from "@bem-react/classname";
import React from 'react';
import './style.css';
import propTypes from 'prop-types';

function ProfileInfo({user, t}) {
  const cn = bem('ProfileInfo')
  return (
    <div className={cn()}>
      <h2>{t('profile.title')}</h2>
      <div className={cn('item')}>{t('profile.name')} <span className={cn('bold')}>{user?.profile?.name}</span></div>
      <div className={cn('item')}>{t('profile.phone')}: <span className={cn('bold')}>{user?.profile?.phone}</span></div>
      <div className={cn('item')}>{t('profile.email')}: <span className={cn('bold')}>{user?.email}</span></div>
    </div>
  )
}

ProfileInfo.propTypes = {
  user: propTypes.object,
  t: propTypes.func
}
ProfileInfo.defaultProps = {
 
}

export default React.memo(ProfileInfo);