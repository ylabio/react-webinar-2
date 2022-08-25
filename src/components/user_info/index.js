import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import style from './style.css'

function UserInfo(props){

    const cn = bem('UserInfo');

    const user = props.result.result

  return (
    <div className={cn()}>
       <h2>Профиль</h2>
       <p>Имя: <strong>{user?.profile?.name}</strong> </p>
       <p>Телефон: <strong>{user?.profile?.phone}</strong> </p>
       <p>email: <strong>{user?.email}</strong> </p>
    </div>
  )
}

UserInfo.propTypes = {
  result: propTypes.object.isRequired
}

UserInfo.defaultProps = {
  result: {}
}

export default React.memo(UserInfo);
