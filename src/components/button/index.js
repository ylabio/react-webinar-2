import React from 'react';
import './style.css';


function Button({ title, onClick, className = null }) {
    return <button className={className} onClick={onClick}>{title}</button>
}



export default React.memo(Button);