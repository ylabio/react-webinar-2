import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from "prop-types";

const UserInfo = ({user, t}) => {
  const cn = bem('User');
  console.log(user);
  return (
    <div className={cn()}>
      <h2>{t("user.profile")}</h2>
      <div className={cn('wrap')}>
        <label className={cn('label')}>{t("user.name")}:</label>
        <div className={cn('value')}>{user && user.profile?.name}</div>
      </div>
      <div className={cn('wrap')}>
        <label className={cn('label')}>{t("user.phone")}:</label>
        <div className={cn('value')}>{user && user.profile?.phone}</div>
      </div>
      <div className={cn('wrap')}>
        <label className={cn('label')}>email:</label>
        <div className={cn('value')}>{user && user.email}</div>
      </div>
    </div>
  );
};
UserInfo.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func
};

UserInfo.defaultProps = {};

export default React.memo(UserInfo);
