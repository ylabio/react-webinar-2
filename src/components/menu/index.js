import React from "react";
import HomeMenuButton from "../home-menu-button";
import "style.css"
import {cn as bem} from "@bem-react/classname";

function  Menu() {
    
    const cn = bem('Menu');

    return (
        <div className={cn()}>
            <HomeMenuButton />
        </div>
    )
}

export default React.memo(Menu)