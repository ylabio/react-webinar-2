import React from 'react';
import InputLabel from "../input-label";

const LoginInput = ({label, type, func}) => {
    return (
        <InputLabel title={label}>
            <input onChange={e => func(e.target.value)} type={type}/>
        </InputLabel>
    );
};

export default LoginInput;