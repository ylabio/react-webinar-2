import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './styles.css';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';


function UserPanel(props){

  const cn = bem('UserPanel');

  return (
    <div className={cn()}>
      {props.token  ?
        <>
          <Link to={props.link}><p className={cn('profile')}>{props.name }</p></Link>
          <button onClick={props.logOut}>{props.logOutTitle}</button>
        </>
        : <button onClick={props.logIn}>{props.loginTitle}</button>
      }
    </div>
  )
}
UserPanel.propTypes = {
  logOut: propTypes.func,
  logIn: propTypes.func,
  name: propTypes.string,
  link: propTypes.string,
  loginTitle: propTypes.string,
  logOutTitle: propTypes.string,
}
UserPanel.defaultProps= {

}


export default React.memo(UserPanel);