import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import Nav from "../../containers/nav";

function Layout({head, children, nav}) {
    const cn = bem('Layout');

    return (
        <div className={cn()}>
            <div>
                {nav}
            </div>
            <div className={cn('head')}>
                {head}
            </div>
            <div className={cn('content')}>
                {children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
    nav: propTypes.node
}

Layout.defaultProps = {}

export default React.memo(Layout);
