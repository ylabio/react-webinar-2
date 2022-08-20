import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css'


const UserInfo = (props) => {

  const cn = bem('UserInfo')
  return (
    <div className={cn()}>
      <h2>{props.title}</h2>
      <p>{props.nameTitle}: <strong>{props.name}</strong></p>
      <p>{props.phoneTitle}: <strong>{props.phone}</strong></p>
      <p>email: <strong>{props.email}</strong></p>
    </div>
  );
};

UserInfo.propTypes = {
  title: propTypes.string,
  nameTitle: propTypes.string,
  phoneTitle: propTypes.string,
  name: propTypes.string,
  phone: propTypes.string,
  email: propTypes.string
}

export default React.memo(UserInfo);