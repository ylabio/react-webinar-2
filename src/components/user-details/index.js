import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const UserDetails = ({ user }) => {
  const cn = bem('UserDetails');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('row')}>
        <label className={cn('label')}>Имя:</label>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('row')}>
        <label className={cn('label')}>Телефон:</label>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('row')}>
        <label className={cn('label')}>email:</label>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
};

export default UserDetails;
