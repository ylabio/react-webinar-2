import React from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function UserInfo (props) {
    const cn = bem('UserCard');
    const { user: { profile: { name, surname, phone }, email }, profile } = props;

    return (
    <div className={cn()}>
      <h2>{profile}</h2>
      <div>{'Имя:'} 
          <span className={cn('info')}>
          {' '}{name}{' '}{surname}
          </span>
      </div>
      <div>{'Телефон:'} 
          <span className={cn('info')}>
            {' '}{phone}
          </span>
      </div>
      <div>{'Email:'} 
          <span className={cn('info')}>
          {' '}{email}
          </span>
      </div>
    </div>
  )
}

export default React.memo(UserInfo);
