import React from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';

const Preloader = () => {

  const cn = bem('Preloader');
    return (
        <div className={cn('')}>
            <div className={cn('container')}>
                <span className={cn('round')}></span>
            </div>
        </div>
    )
};

export default Preloader;