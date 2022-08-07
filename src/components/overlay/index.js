import React, {useEffect, useRef} from 'react'
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {useCloseModal} from "../../hooks/close-modal-hook";

export const Overlay = (props) => {
    const cn = bem('Overlay');
    const ref = useRef();

    useCloseModal(ref, props.closeModal);

    useEffect(() => {
        console.log('swapped');
    }, [props.isOpened])

    if (!props.isOpened) {
        return <></>
    }
    return (
        <div ref={ref} className={cn()}>
            {props.children}
        </div>
    )
}

Overlay.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
}

