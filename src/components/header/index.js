import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

const Header = ({title}) => {
    const cn = bem('Header');
    return (
        <div className={cn()}>
            <h1>
                {title}
            </h1>
        </div>
    );
};

Header.propTypes = {
    title: propTypes.string.isRequired
}

export default React.memo(Header);