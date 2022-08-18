import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from "prop-types";
import translate from "../../utils/translate";

function Header({title, language, children}){
    const cn = bem('Header');

    return (
        <div className={cn()}>
            <h1>{title ? title: translate(language, "header-title")}</h1>
            {children}
        </div>
    )
}

Header.propTypes = {
    language: propTypes.string.isRequired
}

Header.defaultProps = {
    language: "ru"
}
export default React.memo(Header);