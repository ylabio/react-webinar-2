import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import Input from "../../input";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginInput({value, onChange, type, title, onFocus}) {

  // CSS классы по БЭМ
  const cn = bem('LoginInput');

  const callbacks = {
    // Изменение значения элемента формы
    onChange: useCallback((val) => onChange(val), [onChange]),
    // Событие при получении элементом фокуса
    onFocus: useCallback((val) => onFocus(val), [onFocus])
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>{title}</div>
      <Input value={value}
             onChange={callbacks.onChange}
             type={type}
             withoutThrottle={true}
             onFocus={callbacks.onFocus}/>
    </div>
  )
}

LoginInput.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
  type: propTypes.string,
  title: propTypes.string,
  onFocus: propTypes.func
}

LoginInput.defaultProps = {
  value: '',
  onChange: () => {},
  type: '',
  title: '',
  onFocus: () => {}
}

export default React.memo(LoginInput);
