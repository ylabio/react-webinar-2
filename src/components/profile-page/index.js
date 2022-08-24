import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname'
import './style.css';

function ProfilePage(props) {

  const cn = bem('ProfilePage');

  return (
    <div className={cn()}>
      <span className={cn('title')}>Профиль</span>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{props.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{props.phoneNum}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{props.email}</div>
      </div>
    </div>
  )
}

ProfilePage.propTypes = {
  name: propTypes.string,
  phoneNum: propTypes.string,
  email: propTypes.string
}

ProfilePage.defaultProps = {
  name: "",
  phoneNum: "",
  email: ""
}

export default React.memo(ProfilePage);
