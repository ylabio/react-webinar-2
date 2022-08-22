import React from 'react';
import { cn as bem } from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import './style.css';

function UserInfo(props) {
  const cn = bem('UserInfo');
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('userInfo.title')}</h2>
      <ul className={cn('list')}>
        <li>{t('userInfo.name')}: <strong>{props.name}</strong></li>
        <li>{t('userInfo.phone')}: <strong>{props.phone}</strong></li>
        <li>email: <strong>{props.email}</strong></li>
      </ul>
    </div>
  )
}

export default UserInfo;