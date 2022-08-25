import React from 'react';
import propTypes from 'prop-types';
import {cn as bem, cn} from "@bem-react/classname";
import './style.css';
import { Link } from 'react-router-dom';


function Out({userName, deleteToken, t, link}) {
  const cn = bem('Out');
  return (
    <div className={cn()}>
      <Link to={link}><div>{userName}</div></Link>
      <button onClick={()=>deleteToken('deleteToken')}>
        {t('auth.exit')}
      </button>
    </div>
  )
}

Out.propTypes = {
  t: propTypes.func,
  userName: propTypes.string.isRequired,
  deleteToken: propTypes.func.isRequired,
  link: propTypes.string.isRequired
}

Out.defaultProps = {
  t: (text) => text
}

export default React.memo(Out);
