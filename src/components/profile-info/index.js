import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function ProfileInfo({t, user}) {

  // CSS классы по БЭМ
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('prop')}>
        <div className={cn('name')}>{t('profile.name')}: <strong>{user?.profile?.name}</strong></div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('phone')}>{t('profile.phone')}: <strong>{user?.profile?.phone}</strong></div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('email')}>{t('profile.email')}: <strong>{user?.email}</strong></div>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  t: propTypes.func,
  user: propTypes.object
}

ProfileInfo.defaultProps = {
  t: (text) => text,
  user: null
}

export default React.memo(ProfileInfo);
