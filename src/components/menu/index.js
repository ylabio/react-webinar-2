import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../utils/use-store";
import "./style.css";

function Menu() {

    const cn = bem('Menu');
    const navigate = useNavigate();
    const currentPath = useLocation();
    const store = useStore();


    return(
        <p className={cn('link')} onClick={()=> {
            if (currentPath.pathname === "/") {
                store.get('catalog').load(1)
            } else {
                navigate("/")
            }
        }}>Главная</p>
    )
}

export default React.memo(Menu)
