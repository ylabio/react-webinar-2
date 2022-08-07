import React from 'react';
import {cn as bem} from '@bem-react/classname';
import modal from './modal.css'

const ModalBasket = ({active, setActive, children}) => {
    return (
        <div className ={active ? 'modal active' : 'modal'} onClick={ () => setActive(false)} >
            <div className ={active ? 'modal_content active' : 'modal_content'} onClick= {e => e.stopPropagation()}>
            {children}
            </div>
        </div>
    )
}

export default ModalBasket;