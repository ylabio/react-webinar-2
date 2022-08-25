import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function UserProfile({user, t}) {
  const cn = bem('UserProfile');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('userProfile.name')}:</div>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('userProfile.phone')}:</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('userProfile.email')}:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  )
}

UserProfile.propTypes = {
  t: propTypes.func,
  user: propTypes.object.isRequired
}

UserProfile.defaultProps = {
  t: (text) => text
}

export default React.memo(UserProfile);