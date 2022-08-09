import React from 'react';
import './style.css';
import propTypes, {object} from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({modal, setModalActive, head, children}) {
    const cn = bem('Modal');
    return (
        <div className={cn()} onClick={() => setModalActive(modal.id)}>
            <div className={cn('content')} onClick={e => e.stopPropagation()}>
                <div className='head'>
                    {head}
                    <button onClick={() => setModalActive(modal.id)} className={cn('close')}>Закрыть</button>
                </div>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes = {
    deleteItem: propTypes.func,
    modal: propTypes.object.isRequired,
    setModalActive: propTypes.func,
    totalPrice: propTypes.number,
    totalCount: propTypes.number,
    children: object.isRequired
}

Modal.defaultProps = {
    deleteItem: () => {
    },
    setModalActive: () => {
    },
    totalPrice: null,
    totalCount: null
}

export default React.memo(Modal);
