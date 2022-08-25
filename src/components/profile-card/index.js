import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
function ProfileCard({user}) {
  const cn = bem('ProfileCard');

  if (user) {
    return (
      <div className={cn()}>
        <h2 className={cn('title')}>Профиль</h2>
        <div className={cn('line')}>
          <span className={cn('label')}>Имя: </span>
          <b className={cn('value')}>{user.profile?.name}</b>
        </div>
        <div className={cn('line')}>
          <span className={cn('label')}>Телефон: </span>
          <b className={cn('value')}>{user.profile?.phone}</b>
        </div>
        <div className={cn('line')}>
          <span className={cn('label')}>email: </span>
          <b className={cn('value')}>{user.email}</b>
        </div>
      </div>
    )
  }
  return (
    <h2 className={cn('spinner')}>Loading...</h2>
  )
}

ProfileCard.propTypes = {
  user: propTypes.object
}

export default React.memo(ProfileCard);