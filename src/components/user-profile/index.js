import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function UserProfile({ user, translate }) {
  // CSS классы по БЭМ
  const cn = bem('UserProfile');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{translate('profile')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{translate('profile.name')}:</div>
        <div className={cn('value')}>{user.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{translate('profile.phone')}:</div>
        <div className={cn('value')}>{user.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
};

export default React.memo(UserProfile);
