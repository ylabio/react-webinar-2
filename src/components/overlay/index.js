import React, {useRef} from 'react'
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {useCloseModal} from "../../hooks/close-modal-hook";

export const Overlay = (props) => {
    const cn = bem('Overlay');
    const ref = useRef();

    useCloseModal(ref, props.closeModal);

    return (
        <div ref={ref} className={cn()}>
            {props.children}
        </div>
    )
}

Overlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

