import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function UserProfile(props) {
  const cn = bem('UserProfile');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя</div>
        <div className={cn('value')}>{props.user?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{props.user?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{props.user?.email}</div>
      </div>
    </div>
  )
}

UserProfile.propTypes = {
  user: propTypes.object.isRequired
}

export default React.memo(UserProfile);