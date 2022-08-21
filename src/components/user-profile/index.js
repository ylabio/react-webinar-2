import React from 'react';
import propTypes from "prop-types";
import { Navigate } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserProfile(props) {

  const cn = bem('UserProfile');

  return(
    <>
    {props.user &&
      <div className={cn()}>
        <h2>{props.h2}</h2>
        <p>{props.name}: {props.dataUser.profile.name}</p>
        <p>{props.phone}: {props.dataUser.profile.phone}</p>
        <p>{props.email}: {props.dataUser.email}</p>
      </div>
    }  
    {!props.user && <Navigate replace to={props.profileUrl} />}
    </>
  )
}

UserProfile.propTypes = {
    h2: propTypes.string,
    name: propTypes.string,
    phone: propTypes.string,
    email: propTypes.string,
    user: propTypes.string.isRequired,
    dataUser: propTypes.object.isRequired,
    profileUrl: propTypes.string
}

UserProfile.defaultProps = {
    h2: 'Профиль',
    name: 'Имя:',
    phone: 'Телефон:',
    email: 'email:',
    profileUrl: '/login'
}    

export default React.memo(UserProfile);