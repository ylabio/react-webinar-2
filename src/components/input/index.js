import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import throttle from "lodash.throttle";
import './style.css';

function Input(props) {
  const cn = bem('Input');
  
  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(
    props.notThrottle ? 
      value => props.onChange(value) : 
      throttle(value => props.onChange(value), 1000)
    , [props.onChange]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    changeThrottle(event.target.value);
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  return (
    <input
      className={cn({theme: props.theme})}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
      onFocus={props.onFocus}
    />
  )
}

Input.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  onFocus: propTypes.func,
  theme: propTypes.string,
  notThrottle: propTypes.bool
}

Input.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  type: 'text',
  theme: '',
  notThrottle: false
}

export default React.memo(Input);
