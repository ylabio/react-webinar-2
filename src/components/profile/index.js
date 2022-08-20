import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Profile({ response, t }){
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <p>{t('name')}: <b>{response.data.result.profile.name}</b></p>
      <p>{t('phone')}: <b>{response.data.result.profile.phone}</b></p>
      <p>email: <b>{response.data.result.email}</b></p>
    </div>
  )
}

Profile.propTypes = {
  response: propTypes.object,
  t: propTypes.func
}

Profile.defaultProps = {
}

export default React.memo(Profile);
