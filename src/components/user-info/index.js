import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css'

function UserInfo({user}) {
  const profile = user?.profile;
  const email = user?.email;
  const name = profile?.name;
  const phone = profile?.phone;

  const cn = bem('UserInfo');
  const {t} = useTranslate();

  return (
    <div className={cn('')}>
      <div className={cn('title')}>
        {t('profile')}
      </div>
      <div className={cn('item')}>
        <div>{t('name')}: <span className={cn('item_bold')}>{name}</span></div>
      </div>
      <div className={cn('item')}>
        <div>{t('phone')}: <span className={cn('item_bold')}>{phone}</span></div>
      </div>
      <div className={cn('item')}>
        <div>{t('email')}: <span className={cn('item_bold')}>{email}</span></div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  user: propTypes.object.isRequired,
}


export default UserInfo