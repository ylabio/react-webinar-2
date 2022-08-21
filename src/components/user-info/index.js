import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useTranslate from "../../hooks/use-translate";

const UserInfo = ({ user }) => {
  const cn = bem('User');

  const {t} = useTranslate();
  
  return (
    <div className={cn()}>
      <h2>{t("user.profile")}</h2>
      <div className={cn('wrap')}>
        <label className={cn('label')}>{t("user.name")}:</label>
        <div className={cn('value')}>{user && user.username}</div>
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

export default React.memo(UserInfo);