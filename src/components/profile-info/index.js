import React from "react";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function ProfileInfo() {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('content')}>
        <div className={cn('container')}>
          <span>Имя: </span>
          <span>User №1</span>
        </div>
        <div className={cn('container')}>
          <span>Телефон: </span>
          <span>+70000000001</span>
        </div>
        <div className={cn('container')}>
          <span>email: </span>
          <span>test_50@example.com</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProfileInfo);
