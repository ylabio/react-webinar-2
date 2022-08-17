import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

const Menu = ({children}) => {
    const cn = bem('Menu');
    return (
        <nav className={cn()}>
            {children}
        </nav>
    );
};

Menu.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

Menu.defaultProps = {
    data: []
}

export default React.memo(Menu);