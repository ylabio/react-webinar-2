import React from "react";
import LayoutFlex from "../layout-flex";
import {Link} from "react-router-dom";
import './style.css';

function CabinetSimple(props){

    return(
        <LayoutFlex flex='end' padding={false}>
        <Link to='/cabinet' className="CabinetSimple-Link">{props.profile.name}</Link>
        <button onClick={props.onLogout}>Выход</button>
    </LayoutFlex>
    )
}

export default React.memo(CabinetSimple);