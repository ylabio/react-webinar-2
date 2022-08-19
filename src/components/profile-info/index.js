import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'

function ProfileInfo({
  user,
  t
}) {
  const bem = cn('ProfileInfo')
  return (
    <div className={bem()}>
      <h2>{t('profile.title')}</h2>
      <div className={bem('item')}>{t('profile.name')} <span className={bem('bold')}>{user?.profile?.name}</span></div>
      <div className={bem('item')}>{t('profile.phone')}: <span className={bem('bold')}>{user?.profile?.phone}</span></div>
      <div className={bem('item')}>{t('profile.email')}: <span className={bem('bold')}>{user?.email}</span></div>
    </div>
  )
}

export default ProfileInfo