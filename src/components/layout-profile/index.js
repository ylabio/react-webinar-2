import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css";

function LayoutProfile({user, t}) {
  const cn = bem('Profile');
  return(
    <div className={cn()}>
      <h2 className={cn('title')}>{t('auth.profile')}</h2>
      <p className={cn('info')}>{t('auth.name')}: <b>{user?.profile?.name}</b></p>
      <p className={cn('info')}>{t('auth.phone')}: <b>{user?.profile?.phone}</b></p>
      <p className={cn('info')}>{t('auth.email')}: <b>{user?.email}</b></p>
    </div>
  );
}

LayoutProfile.propTypes = {
  user: propTypes.object
}

LayoutProfile.defaultProps = {
  user: {}
}

export default React.memo(LayoutProfile)