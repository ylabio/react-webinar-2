import React from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import propTypes from "prop-types";

function ProfileCard(props) {

  // CSS классы по БЭМ
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.t('profile.profile')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.t('profile.name')}:</div>
        <div className={cn('value')}>{props.userName}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.t('profile.phone')}:</div>
        <div className={cn('value')}>{props.userPhone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{props.userEmail}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  t: propTypes.func.isRequired,
  userEmail: propTypes.string,
  userPhone: propTypes.string,
  UserName: propTypes.string
}

ProfileCard.defaultProps = {
}

export default React.memo(ProfileCard);
