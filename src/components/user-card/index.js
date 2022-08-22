import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserCard(props) {
  // CSS классы по БЭМ
  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{props.user?.username}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{props.user?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{props.user?.email}</div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: propTypes.object.isRequired
};

UserCard.defaultProps = {
  user: {}
};

export default React.memo(UserCard);
