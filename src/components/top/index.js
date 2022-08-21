import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Top({
  handleAuth,
  signOut,
  userData,
  link,
}) {
  const cn = bem('Top');

  return (
    <div className={cn()}>
      {userData && <Link to={link}><span>{userData}</span></Link>}
      <button 
        onClick={userData ? signOut : handleAuth}
      >
        {userData ? 'Выход' : 'Вход'}
      </button>
    </div>
  );
}

Top.propTypes = {
  handleAuth: propTypes.func.isRequired,
  signOut: propTypes.func,
  userData: propTypes.string,
  link: propTypes.string,
}

Top.defaultProps = {
  userData: null,
  signOut: () => {},
  link: '',
}

export default React.memo(Top);