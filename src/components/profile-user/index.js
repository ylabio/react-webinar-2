import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function ProfileUser({user}) {

  // CSS классы по БЭМ
  const cn = bem('ProfileUser');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <p className={cn('description')}>Имя: <span>{user?.username}</span></p>
      <p className={cn('description')}>Телефон: <span>{user.profile?.phone}</span></p>
      <p className={cn('description')}>email: <span>{user?.email}</span></p>
    </div>
  )
}

ProfileUser.propTypes = {
  user: propTypes.object.isRequired,
};

ProfileUser.defaultProps = {
  user: {},
};

export default React.memo(ProfileUser);
