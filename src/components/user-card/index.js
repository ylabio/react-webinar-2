import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './styles.css';

function UserCard(props) {
  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('record')}>Имя: <span>{props.name}</span></div>
      <div className={cn('record')}>Телефон: <span>{props.phone}</span></div>
      <div className={cn('record')}>email: <span>{props.email}</span></div>
    </div>
  )
}

UserCard.propTypes = {
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string
}

UserCard.defaultProps = {
  name: "",
  phone: "",
  email: ""
}

export default React.memo(UserCard);