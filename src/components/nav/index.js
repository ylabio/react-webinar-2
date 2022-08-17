import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function Nav({ translation }) {
    const cn = bem('Nav');
    return (
        <div className={cn()}>
            <NavLink className={cn('link')} to="/1">{translation("home_link")}</NavLink>
        </div>
    )
};

Nav.propTypes = {
    translation: propTypes.func,
}

Nav.defaultProps = {
    translation: () => {},
}

export default React.memo(Nav);