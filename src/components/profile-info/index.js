import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function ProfileInfo(props) {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('profile.title')}</h2>
      <ul className={cn('list')}>
        <li>{props.t('profile.name')}: <strong>{props.name}</strong></li>
        <li>{props.t('profile.phone')}: <strong>{props.phone}</strong></li>
        <li>email: <strong>{props.email}</strong></li>
      </ul>
    </div>
  )
}

export default ProfileInfo;

ProfileInfo.defaultProps = {
  name: '---',
  phone: '---',
  email: '---'
}

ProfileInfo.propTypes = {
  t: propTypes.func.isRequired,
}