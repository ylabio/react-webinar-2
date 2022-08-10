import React from "react";
import propTypes from 'prop-types';
import './style.css';

const BaseButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} className='base_button'>
            {children}
        </button>
    )
}

export default React.memo(BaseButton)

BaseButton.propTypes = {
    onClick: propTypes.func,
    children: propTypes.node
}