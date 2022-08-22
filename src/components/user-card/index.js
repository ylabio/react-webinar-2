import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function UserCard({user, t}) {

  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h2>{t('profile.title')}</h2>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t('profile.name')}:</div>
        <div className={cn("value")}>{user.profile?.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t('profile.phone')}:</div>
        <div className={cn("value")}>{user.profile?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email:</div>
        <div className={cn("value")}>{user.email}</div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func
}

UserCard.defaultProps = {
  user: {},
  t: (text) => text
}

export default React.memo(UserCard);
