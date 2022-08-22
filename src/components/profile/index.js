import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Profile({ user }) {
  const cn = bem('Profile');

  return (
    <div>
      <div className={cn()}>
        <h2 className={cn('title')}>Профиль</h2>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя:</div>
          <div className={cn('value')}>{user.profile?.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон:</div>
          <div className={cn('value')}>{user.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>email:</div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func,
};
