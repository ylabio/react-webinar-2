import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';
import propTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import './style.css';

function Input(props) {
  const cn = bem('Input');

  // Внутренний стейт по умолчанию с переданным value
  const [value, setValue] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeDebounce = useCallback(
    debounce(value => props.onChange(value), 1000),
    [props.onChange]
  );

  // Обработчик изменений в поле
  const onChange = useCallback(
    event => {
      if (props.debounced) {
        setValue(event.target.value);
        changeDebounce(event.target.value);
      } else {
        props.onChange(event.target.value);
      }
    },
    [setValue, changeDebounce, props.debounced]
  );

  // Обновление стейта, если передан новый value
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={cn()}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        id={props.id}
        className={cn({theme: props.theme})}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </div>
  );
}

Input.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
  debounced: propTypes.bool,
  id: propTypes.string,
  title: propTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  debounced: false
};

export default React.memo(Input);
