import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function ProfileCard({profile, t}) {


  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{t('profile')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{profile.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{profile.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{profile.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  profile: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ProfileCard.defaultProps = {
  article: {},
  onAdd: () => {}
}

export default React.memo(ProfileCard);
