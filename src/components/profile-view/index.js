import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function ProfileView({ name, phone, email }) {
  const cn = bem('ProfileView');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>Профиль</h2>
      <div className={cn('items')}>
        <div className={cn('item')}>
          Имя: <span className={cn('bold')}>{name}</span>
        </div>
        <div className={cn('item')}>
          Телефон: <span className={cn('bold')}>{phone}</span>
        </div>
        <div className={cn('item')}>
          email: <span className={cn('bold')}>{email}</span>
        </div>
      </div>
    </div>
  );
}

ProfileView.propTypes = {
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string,
};

ProfileView.defaultProps = {};

export default ProfileView;
