import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function ProfileCart(props) {
  const cn = bem('ProfileCart');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('items')}>
        <div className={'name'}>Имя: <strong>{props.name}</strong></div>
        <div className={'tel'}>Телефон: <strong>{props.tel}</strong></div>
        <div className={'email'}>email: <strong>{props.email}</strong></div>
      </div>
    </div>
  )
}

ProfileCart.propTypes = {
  name: propTypes.string,
  tel: propTypes.string,
  email: propTypes.string
}

ProfileCart.defaultProps = {
  name: '',
  tel: '',
  email: ''
}


export default React.memo(ProfileCart)