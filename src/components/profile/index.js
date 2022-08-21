import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Profile({ user }){
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <span className={cn('title')}>Профиль</span>
      <div className={cn('field')}>Имя: <span>{user.name}</span></div>
      <div className={cn('field')}>Телефон: <span>{user.phone}</span></div>
      <div className={cn('field')}>email: <span>{user.email}</span></div>
    </div>
  )
}

Profile.propTypes = {
  user: propTypes.object,
}

Profile.defaultProps = {
  user: {},
}

export default React.memo(Profile);