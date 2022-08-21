import React from "react";
import {cn as bem} from "@bem-react/classname";
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import style from './style.css'

function HeaderSign({result, logout, profile}){

  const cn = bem('HeaderSign');

  return (
    result?.token || localStorage.getItem('token')
    ? 
    <div className={cn()}>
      <Link to={`/profile/${profile}`}>{result?.user?.profile?.name || result?.profile?.name}</Link>
      <Link to={'/'}><button onClick={logout} >{'Выйти'}</button></Link> 
    </div>
    : <Link to={'/login'}><button className={cn()}>{'Вход'}</button></Link> 
  ) 
  
}

HeaderSign.propTypes = {
  logout: propTypes.func.isRequired,
  profile: propTypes.string,
  result: propTypes.object.isRequired,
}

HeaderSign.defaultProps = {
  logout: () => {},
  result: {},
}

export default React.memo(HeaderSign);
