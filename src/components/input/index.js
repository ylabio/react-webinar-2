import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from "lodash.debounce";
import './style.css';

function Input(props) {
  const cn = bem('Input');

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

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
      name={props.name}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

Input.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: ''
}

export default React.memo(Input);
