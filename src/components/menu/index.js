import React from "react";
import HomeMenuButton from "../home-menu-button";

function  Menu() {
    return (
        <div>
            <HomeMenuButton />
        </div>
    )
}

export default React.memo(Menu)