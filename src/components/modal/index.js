import React from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

export default function Modal(){
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            Modal
        </div>
    )
}