import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import 'style.css'

const Navigation = () => {
    const cn = bem('Navigation');
    return (
            <div className={cn()}>
                <Link to='/'><span >Главная</span></Link>
            </div>
    );
};

export default Navigation;