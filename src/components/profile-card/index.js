import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

function ProfileCard(props) {
  const cn = bem('Profile');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('info')}>
        <div>
          Имя: <b>{props.user.profile?.name}</b>
        </div>
        <div>
          Телефон: <b>{props.user.profile?.phone}</b>
        </div>
        <div>
          email: <b>{props.user.email}</b>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: propTypes.object.isRequired,
};

ProfileCard.defaultProps = {};

export default React.memo(ProfileCard);
