import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal({closeCart, head, children}) {
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            <div className={cn('window')}>
                <div className={cn('head')}>
                    {head}
                    <button className={cn('close')} onClick={closeCart}>
                        Закрыть
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
    closeCart: propTypes.func.isRequired,
}

Modal.defaultProps = {}

export default React.memo(Modal);
