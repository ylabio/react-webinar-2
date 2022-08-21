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
    props.withoutThrottle
    ? value => props.onChange(value)
    : throttle(value => props.onChange(value), 1000),
    [props.onChange]);

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
  theme: propTypes.string,
  withoutThrottle: propTypes.bool,
  onFocus: propTypes.func
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  withoutThrottle: false,
  onFocus: () => {}
}

export default React.memo(Input);
