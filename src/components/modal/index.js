import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from "react-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const modalRootElement = document.querySelector('#modal');

function Modal({onClose, title, children}) {
    const cn = bem('Modal');
    return (ReactDOM.createPortal(
        <div className={cn()}>
            <div className={cn('wrapper')}>
                <div className={cn('header')}>
                    <h3 className={cn('title')}>{title}</h3>
                    <button onClick={() => onClose(onClose)}>Закрыть</button>
                </div>
                <div className={cn('content')}>
                    {children}
                </div>
            </div>
        </div>,
        modalRootElement
    ));
}

Modal.propTypes = {
    onClose: propTypes.func.isRequired,
    title: propTypes.string,
    children: propTypes.node
};

Modal.defaultProps = {
    onClose: () => {},
    title: 'Modal',
    children: null,
};

export default React.memo(Modal);