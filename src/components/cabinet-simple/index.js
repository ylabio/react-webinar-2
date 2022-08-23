import React from "react";
import LayoutFlex from "../layout-flex";
import {Link} from "react-router-dom";
import './style.css';

function CabinetSimple(props){

    return(
        <LayoutFlex flex='end' padding={false}>
        <Link to='/cabinet' className="CabinetSimple-Link">{props.profile.name}</Link>
        <Link to='/login'><button onClick={props.onLogout}>Выход</button></Link>
    </LayoutFlex>
    )
}

export default React.memo(CabinetSimple);