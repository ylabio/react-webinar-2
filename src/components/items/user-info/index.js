import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const UserInfo = ({ user, t }) => {
  return (
    <>
      <h3>{t('user.profile')}</h3>
      <div className={'UserInfo_font_size_18'}>
        {t('user.name')}: <strong>{user.name}</strong>
      </div>
      <div className={'UserInfo_font_size_18'}>
        {t('user.phone')}: <strong>{user.phone}</strong>
      </div>
      <div className={'UserInfo_font_size_18'}>
        {t('user.email')}: <strong>{user.email}</strong>
      </div>
    </>
  );
};

UserInfo.propTypes = {
  t: propTypes.func,
  user: propTypes.object.isRequired,
};

UserInfo.defaultProps = {
  t: (text) => text,
};

export default React.memo(UserInfo);
