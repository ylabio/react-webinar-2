import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ user, t }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2>{t('profile.title')}</h2>
      <span className={cn('prop')}>{t('profile.name')}: <b>{user.profile?.name}</b></span>
      <span className={cn('prop')}>{t('profile.phone')}: <b>{user.profile?.phone}</b></span>
      <span className={cn('prop')}>email: <b>{user.email}</b></span>
    </div>
  );
}

ProfileCard.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text
};

export default React.memo(ProfileCard);
