import React from "react";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function ModalLayout({head, children}){
    const cn = bem('Modal');
   
    return (
        <div className={cn()}>
            <div className={cn('header')}>
                {head}
            </div>
            {children}
        </div>
    )
}

ModalLayout.propTypes = {
  head: propTypes.node,
  children: propTypes.node

}

ModalLayout.defaultProps = {
}

export default React.memo(ModalLayout);