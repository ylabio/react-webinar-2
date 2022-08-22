import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

const InputLabel = ({children, title}) => {
    const cn = bem('InputLabel');
    return (
        <div className={cn()}>
            <p className={cn('title')}>{title}</p>
            {children}
        </div>
    );
};

InputLabel.propTypes = {
    children: propTypes.node.isRequired,
    title: propTypes.string.isRequired
}

export default InputLabel;