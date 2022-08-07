import React from 'react'
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function  Modal({active, children}) {
    const cn = bem('Modal');

    return (
        <div className={active ? `${cn()} ${cn('active')}` : cn()}>
            <div className={cn('content')} onClick={(event)=>{event.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    active: propTypes.bool.isRequired,
    children: propTypes.node
}

Modal.defaultProps = {
    active: false
}

export default React.memo(Modal)