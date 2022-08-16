import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

const MainLink = () => {
    let cn = bem("MainLink");

    return <>
        <span className={cn()}>
          <Link to={"/"}>Главная</Link>
        </span>
    </>
}

export default MainLink;