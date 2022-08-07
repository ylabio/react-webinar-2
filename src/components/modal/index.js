import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from "react-dom";
import {cn as bem} from "@bem-react/classname";

import './style.css';

function Modal({onClose, title, children}) {
    const cn = bem('Modal');
    return (ReactDOM.createPortal(
        <div className={cn()}>
            <div className={cn('wrapper')}>
                <div className={cn('header')}>
                    <h3 className={cn('title')}>{title}</h3>
                    <button onClick={() => onClose(onClose)}>Закрыть</button>
                </div>

                <div className={cn('main')}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    ));
}

Modal.propTypes = {
    onClose: propTypes.func.isRequired,
    title: propTypes.string,
    children: propTypes.node
};

Modal.defaultProps = {
    onClose: () => {
    },
    title: "Modal",
    children: null,
};

export default React.memo(Modal);
