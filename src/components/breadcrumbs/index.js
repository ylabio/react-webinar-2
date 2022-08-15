import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css'

function Breadcrumbs({crumbs}) {
    const cn = bem('Breadcrumbs');
    return (
        <div className={cn()}>
            <Link className={cn('link')} to='/'>{crumbs}</Link>
        </div>
    )
}

Breadcrumbs.propTypes = {
    crumbs: propTypes.string
}

Breadcrumbs.defaultProps = {
    crumbs: ''
}

export default React.memo(Breadcrumbs);
