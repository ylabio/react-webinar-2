import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './styles.css'

function ProfileInfo({ user, t }) {
  const cn = bem('ProfileInfo')

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('name')}>
        {t('profile.name')}: <b>{user.name}</b>
      </div>
      <div className={cn('tel')}>
        {t('profile.phone')}: <b>{user.phone}</b>
      </div>
      <div className={cn('email')}>
        e-mail: <b>{user.email}</b>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  user: propTypes.object.isRequired,
}

ProfileInfo.defaultProps = {}

export default React.memo(ProfileInfo)
