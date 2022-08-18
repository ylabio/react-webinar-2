import React from 'react';
import { Link } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

const Navbar = () => {
    const cn = bem('Navbar');

    return (
        <div className={cn()}>
            <Link to="/"><span>Главная</span></Link>
        </div>

    );
};

export default Navbar;