import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const User = ({ user }) => {
  const cn = bem('User');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <p className={cn('field')}>
        Имя: <span className={cn('field-value')}>{user.profile?.name}</span>
      </p>
      <p className={cn('field')}>
        Телефон: <span className={cn('field-value')}>{user.profile?.phone}</span>
      </p>
      <p className={cn('field')}>
        email: <span className={cn('field-value')}>{user.email}</span>
      </p>
    </div>
  );
};

export default User;
