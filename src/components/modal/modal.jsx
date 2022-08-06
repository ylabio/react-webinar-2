import React from "react";
import { cn as bem } from "@bem-react/classname";
import './modal.css'
import propTypes from 'prop-types';


const Modal = ({ active, setAtive, children }) => {
    const cn = bem('Modal');

    return (
        <div className={active ? cn("") : cn("active")} onClick={() => setAtive(false)}>
            <div className={active ? cn("content") : cn("content-active")} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
Modal.propTypes = {
    active: propTypes.bool.isRequired,
    setAtive: propTypes.func.isRequired,
    children: propTypes.node.isRequired
}
export default Modal;