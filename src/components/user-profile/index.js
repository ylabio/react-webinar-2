import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function UserProfile(props) {
  const cn = bem('UserProfile');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя</div>
        <div className={cn('value')}>User №1</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>+70000000001</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>test_50@example.com</div>
      </div>
    </div>
  )
}

UserProfile.propTypes = {

}

UserProfile.defaultProps = {
 
}

export default React.memo(UserProfile);