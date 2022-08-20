import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import throttle from "lodash.throttle";
import './style.css';

function TextField(props) {
  const cn = bem('TextField');

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(throttle(value => props.onChange(value), 1000), [props.onChange]);

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
    <label className={cn({ theme: props.theme })}>
      {props.label}
      <input
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </label>
  )
}

TextField.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

TextField.defaultProps = {
  label: '',
  onChange: () => {},
  type: 'text',
  theme: ''
}

export default React.memo(TextField);
