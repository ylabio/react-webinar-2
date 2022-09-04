import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileLayout(props){
const cn = bem('ProfileLayout');

return (
    <div className={cn()}>
      <h2 className={cn('Head')}>Профиль</h2>
     <div className={cn('Item')}><span>{'Имя: '}<b>{props.user.profile.name}</b></span></div>
     <div className={cn('Item')}><span>{'Телефон: '}<b>{props.user.profile.phone}</b></span></div>
     <div className={cn('Item')}><span>{'email: '}<b>{props.user.email}</b></span></div>
    </div>
)
}

export default React.memo(ProfileLayout);
