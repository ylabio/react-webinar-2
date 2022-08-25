import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import style from './style.css'

function FormInput({label, type, toInput, ...props}) {
    const cn = bem('FormInput');

    const [value, change] = useState(props.value);

    const onChange = useCallback(event => {
        change(event.target.value);
        toInput(event.target.value)
    }, [change])

    return (
        <div className={cn()}>
            <label>{label}</label>
            <input value={value} onChange={onChange} type={type}/>
        </div>
    );
}
FormInput.propTypes = {
    toInput: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
  }
  
FormInput.defaultProps = {
    toInput: () => {},
    login: '',
    password: '',
    value: ''
}
export default React.memo(FormInput);
