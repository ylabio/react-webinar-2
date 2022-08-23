import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserProfile(props) {

  const cn = bem('UserProfile');

  return(
    <div className={cn()}>
      <h2>{props.h2}</h2>
      <p>{props.name}: {props.dataUser.profile.name}</p>
      <p>{props.phone}: {props.dataUser.profile.phone}</p>
      <p>{props.email}: {props.dataUser.email}</p>
    </div>
  )
}

UserProfile.propTypes = {
    h2: propTypes.string,
    name: propTypes.string,
    phone: propTypes.string,
    email: propTypes.string,
    dataUser: propTypes.object.isRequired
}

UserProfile.defaultProps = {
    h2: 'Профиль',
    name: 'Имя:',
    phone: 'Телефон:',
    email: 'email:'
}    

export default React.memo(UserProfile);