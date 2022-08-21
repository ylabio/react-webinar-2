import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function MenuRegister(props) {
  const cn = bem('MenuRegister');

  return (
    <div className={cn()}>
      {props.token ?
      <>
        <Link to='/profile' className={cn('profile')}>{props.user?.profile?.name}</Link>
        <button className={cn('btn')} onClick={props.onLogout}>Выход</button>
      </> : <Link className={cn('btn')} to='/login'>Вход</Link>
      }
    
    </div>
  )
}

MenuRegister.propTypes = {
  onLogout: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
}

MenuRegister.defaultProps = {
  onLogout: () => {},
  user: {}
}

export default React.memo(MenuRegister);
