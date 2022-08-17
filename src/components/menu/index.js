import React from 'react';
import propTypes, {object} from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

function Menu({children}) {
    const cn = bem('Menu');
    return (
        <div className={cn()}>
            {children}
        </div>
    )
}

Menu.propTypes = {
    children: propTypes.oneOfType([
        propTypes.object,
        propTypes.arrayOf(object)
    ]),
}


export default React.memo(Menu);
