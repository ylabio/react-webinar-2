import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Profile({ name, phone, email, t }){
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <p>{t('name')}: <b>{name}</b></p>
      <p>{t('phone')}: <b>{phone}</b></p>
      <p>email: <b>{email}</b></p>
    </div>
  )
}

Profile.propTypes = {
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string,
  t: propTypes.func
}

Profile.defaultProps = {
}

export default React.memo(Profile);
