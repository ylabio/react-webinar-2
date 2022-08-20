import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ user }) {
  // CSS классы по БЭМ
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('item')}>
        <p>Имя:</p>
        <p>{user.name}</p>
      </div>
      <div className={cn('item')}>
        <p>Телефон:</p>
        <p>{user.phone}</p>
      </div>
      <div className={cn('item')}>
        <p>Почта:</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: propTypes.object,
};

ProfileCard.defaultProps = {};

export default React.memo(ProfileCard);
