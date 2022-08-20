import React from 'react'
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css'

function UserProfile({user, t}) {
  const cn = bem('UserProfile')

  return (
    <div>
        <div className={cn()}>
          <h2 className={cn('title')}>{t('user.profile')}</h2>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('user.name')}:</div>
            <div className={cn('value')}>{user.profile?.name}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>{t('user.phone')}:</div>
            <div className={cn('value')}>{user.profile?.phone}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>email:</div>
            <div className={cn('value')}>{user.email}</div>
          </div>
        </div>
    </div>
  )
}

export default UserProfile

UserProfile.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func
}