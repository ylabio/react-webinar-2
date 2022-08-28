import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function ProfileCard(props) {

  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}><h2>Профиль</h2></div>

      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{props.user.profile.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{props.user.profile.phone}</div>
      </div>
      <div className={cn('prop',)}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{props.user.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  user: propTypes.object.isRequired,
}

ProfileCard.defaultProps = {
  user: {},
}

export default React.memo(ProfileCard);
