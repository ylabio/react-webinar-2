import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProfileCard(props) {
  const cn = bem('ProfileCard');
  
  return (
    <div className={cn()}>
      <div className={cn('profile')}>
        <strong>{props.t('profile.profile')}</strong>
      </div>
      <div className={cn('name')}>
        {props.t('profile.name')}: <strong>{props.user.profile.name}</strong>
      </div>
      <div className={cn('phone')}>
        {props.t('profile.phone')}: <strong>{props.user.profile.phone}</strong>
      </div>
      <div className={cn('email')}>
        {props.t('profile.email')}: <strong>{props.user.email}</strong>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  t: propTypes.func,
  user: propTypes.object.isRequired
}

ProfileCard.defaultProps = {
  t: (text) => text
}

export default React.memo(ProfileCard);