import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

const UserDetails = ({ user, t }) => {
  const cn = bem('UserDetails');

  return (
    <div className={cn()}>
      <h2>{t('user.title')}</h2>
      <div className={cn('row')}>
        <label className={cn('label')}>{t('user.profileName')}:</label>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('row')}>
        <label className={cn('label')}>{t('user.phone')}:</label>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('row')}>
        <label className={cn('label')}>email:</label>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: propTypes.object,
};

UserDetails.defaultProps = {};

export default React.memo(UserDetails);
