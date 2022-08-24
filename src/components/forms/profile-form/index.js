import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import React from 'react';
import './style.css';

function ProfileForm({fields, t}) {
  const cn = bem('Profileform');
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('field')}>{t('profile.name')}: <b>{fields.profile?.name ? fields.profile.name : fields.username}</b></div>
      <div className={cn('field')}>{t('profile.phone')}: <b>{fields.profile?.phone}</b></div>
      <div className={cn('field')}>{t('profile.email')}: <b>{fields.email}</b></div>
    </div>
  );
};

ProfileForm.propTypes = {
  fields: propTypes.object.isRequired,
  t: propTypes.func
}

ProfileForm.defaultProps = {
  t: (text) => text
}

export default React.memo(ProfileForm);