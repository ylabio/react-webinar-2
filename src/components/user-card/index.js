import React from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import useTranslate from "../../hooks/use-translate";


function UserCard({userInfo}) {
  // CSS классы по БЭМ
  const cn = bem('UserInfo');

  const {t} = useTranslate();


  return (
    <div className={cn()}>
      <h2 className={cn('h2')}>{t("user.profile")}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("user.name")}:</div>
        <div className={cn('value')}>{userInfo.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("user.phone")}:</div>
        <div className={cn('value')}>{userInfo.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{userInfo.email}</div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  userInfo: propTypes.object.isRequired,
};

UserCard.defaultProps = {
  userInfo: {},
};

export default React.memo(UserCard);
