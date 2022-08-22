import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Profile({ name, phone, email, t }){
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile')}</h2>
      <p className={cn('text')}>{t('name')}: <span className={cn('text', {'fw': 'bold'})}>{name}</span></p>
      <p className={cn('text')}>{t('phone')}: <span className={cn('text', {'fw': 'bold'})}>{phone}</span></p>
      <p className={cn('text')}>email: <span className={cn('text', {'fw': 'bold'})}>{email}</span></p>
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
