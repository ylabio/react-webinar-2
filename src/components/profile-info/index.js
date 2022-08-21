import React from "react";
import {cn as bem} from '@bem-react/classname'
import propTypes from "prop-types";
import './style.css';

function ProfileInfo({ info }) {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('content')}>
        <div className={cn('container')}>
          <span>Имя: </span>
          <span>{info.profile.name}</span>
        </div>
        <div className={cn('container')}>
          <span>Телефон: </span>
          <span>{info.profile.phone}</span>
        </div>
        <div className={cn('container')}>
          <span>email: </span>
          <span>{info.email}</span>
        </div>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  info: propTypes.object,
}

export default React.memo(ProfileInfo);
