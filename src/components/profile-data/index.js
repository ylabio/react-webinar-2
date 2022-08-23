import React, {useCallback, useMemo} from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProfileData({ user }) {
  const cn = bem('AuthForm');

  const callbacks = {
    onAuth: useCallback((e) => {
      e.preventDefault();
      props.onAuth(e.target[0].value, e.target[1].value), [props.onAuth];
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>Профиль</div>
        <div className={cn('data')}>Имя:</div>
        <div className={cn('data')}>Телефон:</div>
        <div className={cn('data')}>email:</div>
    </div>
  )
}

ProfileData.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

ProfileData.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(ProfileData);
