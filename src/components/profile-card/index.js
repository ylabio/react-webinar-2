import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ user }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <span className={cn('prop')}>Имя: <b>{user.profile?.name}</b></span>
      <span className={cn('prop')}>Телефон: <b>{user.profile?.phone}</b></span>
      <span className={cn('prop')}>email: <b>{user.email}</b></span>
    </div>
  );
}

ProfileCard.propTypes = {
  user: propTypes.object.isRequired,
};

export default React.memo(ProfileCard);
