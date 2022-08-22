import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Form from "../../containers/form";

const LoginCard = ({title}) => {
    const cn = bem('LoginCard');
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className={cn()}>
            <h2>
                {title}
            </h2>
            <div className={cn('form')}>
                <Form/>
            </div>
        </div>
    );
};

export default LoginCard;