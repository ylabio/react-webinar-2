import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css'

function Menu({children}) {
    const cn = bem('Menu');
    return (
        <div className={cn()}>
            <Link className={cn('link')} to='/'>{children}</Link>
        </div>
    )
}

Menu.propTypes = {
    crumbs: propTypes.string
}

Menu.defaultProps = {
    crumbs: ''
}

export default React.memo(Menu);
