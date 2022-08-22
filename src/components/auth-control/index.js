import React from 'react';
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import './style.css';

function AuthControl(props) {
  const cn = bem('AuthControl');
  return (
    <div className={cn()}>
      {props.isLogin && <Link className={cn('name')} to={'/profile'}>{props.userName}</Link>}
      
        {props.isLogin 
        ? <button onClick={() => props.logout()}>{props.t('authControl.logout')}</button>
        : <Link to={'/login'}><button>{props.t('authControl.signIn')}</button></Link>  
      }         
    </div>
  )
}

export default React.memo(AuthControl);
