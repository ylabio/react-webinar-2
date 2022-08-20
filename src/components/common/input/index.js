import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';
import propTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import './style.css';

function Input(props) {
  const cn = bem('Input');

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeDebounce = useCallback(
    debounce(value => props.onChange(value), 1000),
    [props.onChange]
  );

  // Обработчик изменений в поле
  const onChange = useCallback(
    event => {
      change(event.target.value);
      changeDebounce(event.target.value);
    },
    [change, changeDebounce]
  );

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
    />
  );
}

Input.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: ''
};

export default React.memo(Input);
