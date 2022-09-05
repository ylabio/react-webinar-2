import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from "lodash.debounce";
import './style.css';

function Textarea(props) {
  const cn = bem('Textarea');

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(
    debounce(value => props.onChange(value), 600),
    [props.onChange]
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
    <textarea
      className={cn({theme: props.theme})}
      name={props.name}
      value={value}
      onChange={onChange}
    />
  )
}

Textarea.propTypes = {
  value: propTypes.string,
  name: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

Textarea.defaultProps = {
  onChange: () => {},
  theme: ''
}

export default React.memo(Textarea);
