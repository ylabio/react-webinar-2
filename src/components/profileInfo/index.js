import React from 'react';
import './style.css';

function ProfileInfo({ user }) {
  return (
    <div className='profile'>
      <p className='profileTitle'>Профиль</p>
      <p className='desc'>
        Имя: <span className='profileInfo'>{user.username}</span>
      </p>
      <p className='desc'>
        Телефон: <span className='profileInfo'>{user.profile.phone}</span>
      </p>
      <p className='desc'>
        email: <span className='profileInfo'>{user.email}</span>
      </p>
    </div>
  );
}

export default ProfileInfo;
