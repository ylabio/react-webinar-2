import React from 'react';
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import {Pagination} from "../pagination";
import './style.css';
import {cn as bem} from "@bem-react/classname";

const Menu = ({url, title}) => {
    const cn = bem('Menu');
    return (
        <Link className={cn('link')} to={url}>
            {title}
        </Link>
    );
};

Menu.propTypes = {
    url: propTypes.string.isRequired,
    title: propTypes.string.isRequired
}

export default React.memo(Menu);