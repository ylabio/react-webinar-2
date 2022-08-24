import React from 'react';
import propTypes from "prop-types";

import './style.css';

const ProfileInfo = ({ info }) => {
  return (
    <div className='profile-info'>
      <h2>Вход</h2>

      <p>Имя: <b>{info.name}</b></p>
      <p>Телефон: <b>{info.phone}</b></p>
      <p>email: <b>{info.email}</b></p>
    </div>
  )
}

ProfileInfo.defaultProps = {
  info: {
    _id: '...loading',
    name: '...loading',
    phone: '...loading',
  },
};

export default React.memo(ProfileInfo);