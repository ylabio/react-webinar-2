import React from "react"
import { Link } from "react-router-dom"
import Controls from "../controls"
import LayoutFlex from "../layout-flex"
import './style.css';

function AuthControls(props) {
  return (
    <LayoutFlex flex={"end"} padding={false}>
      <div className="profile-link">
        <Link to='profile'>User №1</Link>
      </div>
      <Controls handler={props.redirect} title={'Вход'}/>
  </LayoutFlex>
  )
}

export default React.memo(AuthControls);
