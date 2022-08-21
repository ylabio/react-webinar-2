import React from "react";
import {cn as bem} from "@bem-react/classname";
import './styles.css'
import { useNavigate } from "react-router-dom";


function UserPanel(props) {
    const cn = bem('UserPanel');
    const navigate = useNavigate();

    UserPanel.defaultProps = {
        userName: "",
        onAuth: ()=>{}
    }

    return (
        <div className={cn()}>
            {props.isAuth ? 
                <>
                    <button className={cn("button")} onClick={props.onLogout}>Выйти</button> 
                    <a className={cn("link")} onClick={()=>{navigate("../profile")}}>{props.userName}</a>
                </>
            : 
                <button className={cn("button")} onClick={props.onAuth}>Войти</button>
            }
        </div>
    ) 
}

export default React.memo(UserPanel);
