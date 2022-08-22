import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const ErrorMessage = ({message}) => {
    console.log(message);
    const cn = bem('Error');
    if (message === '') {
        return (
            <div className={cn('wrapper')}>
            </div>
        )
    }
    return (
        <p className={cn()}>
            {message}
        </p>
    )
};

export default ErrorMessage;