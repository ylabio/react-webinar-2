import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function ProfileInfo(props) {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <p>Профиль: <b>{props.name}</b></p>
      <p>Телефон: <b>{props.phone}</b></p>
      <p>email: <b>{props.email}</b></p>
    </div>)
}

ProfileInfo.propTypes = {
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string,
}

ProfileInfo.defaultProps = {
  name: '',
  phone: '',
  email: '',
}

export default React.memo(ProfileInfo);
