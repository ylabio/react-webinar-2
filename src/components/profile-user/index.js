import {cn as bem} from '@bem-react/classname'
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function ProfileUser({name, phone, email}) {

  // CSS классы по БЭМ
  const cn = bem('ProfileUser');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <p className={cn('description')}>Имя: <span>{name}</span></p>
      <p className={cn('description')}>Телефон: <span>{phone}</span></p>
      <p className={cn('description')}>email: <span>{email}</span></p>
    </div>
  )
}

ProfileUser.propTypes = {
  name: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
}

ProfileUser.defaultProps = {
  name: '',
  email: '',
  phone: '',
}

export default React.memo(ProfileUser);
