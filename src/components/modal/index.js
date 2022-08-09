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
    head: propTypes.object,
    modal: propTypes.object.isRequired,
    setModalActive: propTypes.func,
    children: propTypes.arrayOf(object).isRequired,
}

export default React.memo(Modal);
