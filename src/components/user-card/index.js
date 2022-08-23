import React from 'react'
import useTranslate from '../../hooks/use-translate';
import { cn as bem } from '@bem-react/classname';
import './style.css'
import propTypes from 'prop-types';

function UserCard({ user }) {

  const { name, phone, email } = user
  const cn = bem('UserCard');
  const { t } = useTranslate();
  return (
    <div className={cn('')}>
      <div className={cn('title')}>
        {t('profile')}
      </div>
      <div className={cn('item')}>
        <p>{t('name')}:<span> {name}</span> </p>
      </div>
      <div className={cn('item')}>
        <p>{t('telephone')}: <span> {phone}</span> </p>
      </div>
      <div className={cn('item')}>
        <p>email: <span> {email}</span> </p>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: propTypes.object.isRequired,
}


export default UserCard
