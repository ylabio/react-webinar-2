import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";

function Header(props) {
  const cn = bem('Header');
  
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <Link to='/profile'>
          <div className={cn('userName')}>{props.userName}</div>
        </Link>
        <Link to='/login'>
          <button className={cn('toLoginButton')} onClick={props.logout}>{props.buttonText}</button>
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {}

Header.defaultProps = {}

export default React.memo(Header);
