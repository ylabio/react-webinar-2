import React from "react"
import { Link } from "react-router-dom"
import Controls from "../controls"
import LayoutFlex from "../layout-flex"
import './style.css';
import propTypes from "prop-types";

function AuthControls({token, name, logout, redirect}) {
  console.log('CONTROLS', token)
  return (
    <LayoutFlex flex={"end"} padding={false}>
      <div className="profile-link">
        <Link to='/profile'>{name}</Link>
      </div>
      {
        token ?
        <Controls handler={logout} title={'Выход'}/>
        :
        <Controls handler={redirect} title={'Вход'}/>
      }
  </LayoutFlex>
  )
}

AuthControls.propTypes = {
  token: propTypes.string,
  name: propTypes.string,
  redirect: propTypes.func,
}

export default React.memo(AuthControls);
